# Sitemap & Google Search Console — Estado y Seguimiento

## Problema
Google Search Console muestra "No se ha podido leer el sitemap" para `https://altorracars.github.io/sitemap.xml`.
Bersaglio Jewelry (`bersagliojewelry.co`) se indexó de inmediato; Altorra Cars no.

## Diagnóstico realizado (24 mar 2026)

### Causas identificadas y corregidas
| Problema | Archivo | Fix aplicado |
|----------|---------|-------------|
| `Disallow: /*.json$` con `$` no estándar | `robots.txt` | Eliminado, simplificado al estilo Bersaglio |
| Sin `Allow: /` explícito en `User-agent: *` | `robots.txt` | Agregado |
| Bloqueo excesivo de bots (AhrefsBot, SemrushBot, etc.) | `robots.txt` | Eliminado |
| Comentarios HTML dentro del XML (`<!-- -->`) | `sitemap.xml` | Eliminados |
| Líneas en blanco entre entradas XML | `sitemap.xml` | Eliminadas |
| Script de generación inyectaba formato sucio | `generate-vehicles.mjs` | Reescrito `generateSitemap()` |

### Verificaciones realizadas
- `curl` como Googlebot: HTTP 200, `content-type: application/xml`, 13126 bytes, sin redirects
- `xmllint --noout sitemap.xml`: XML válido
- URLs de vehículos y marcas en sitemap: todas retornan HTTP 200
- `robots.txt` sirve correctamente con directiva `Sitemap:` visible
- No hay bloqueo de Googlebot en ningún nivel

### Descartado como causa
- **No tener dominio pago** no impide indexación (github.io funciona), pero Google da menor prioridad de crawl a subdominios `.github.io` vs dominios propios
- **La ubicación del sitemap en la raíz** (vs `public/` en Bersaglio) es correcta para un sitio estático sin bundler
- **La arquitectura Jamstack** (Firestore + GitHub Actions + GitHub Pages) no afecta la indexación

## Acciones pendientes

### Inmediato (hacer manualmente en Google Search Console)
- [ ] Ir a Search Console > Sitemaps
- [ ] Eliminar el sitemap actual (`/sitemap.xml`) — click en 3 puntos → Eliminar
- [ ] Volver a enviarlo: escribir `sitemap.xml` → ENVIAR
- [ ] Esperar 5-10 minutos y verificar el estado

### Si sigue fallando después de re-enviar (esperar hasta 48h — 26 mar 2026)
- [ ] Verificar estado en Search Console nuevamente
- [ ] Usar "Inspección de URLs" en Search Console → pegar `https://altorracars.github.io/sitemap.xml` → ver diagnóstico de Google
- [ ] Si persiste el error, considerar comprar un dominio personalizado (ej: `altorracars.co`) — esto mejora crawl priority y elimina limitaciones de subdominios github.io
- [ ] Verificar que el GitHub Actions workflow no haya regenerado el sitemap con formato viejo (revisar último commit en main que toque `sitemap.xml`)

### Verificación técnica rápida (para Claude en futuras sesiones)
```bash
# 1. Verificar que el sitemap sirve correctamente
curl -sI -A "Googlebot" https://altorracars.github.io/sitemap.xml | head -5
# Esperado: HTTP/2 200, content-type: application/xml

# 2. Verificar XML válido
curl -s https://altorracars.github.io/sitemap.xml | xmllint --noout -
# Esperado: sin output (válido)

# 3. Verificar robots.txt tiene Sitemap directive
curl -s https://altorracars.github.io/robots.txt | grep -i sitemap
# Esperado: Sitemap: https://altorracars.github.io/sitemap.xml

# 4. Verificar que no hay comentarios XML en sitemap
curl -s https://altorracars.github.io/sitemap.xml | grep '<!--'
# Esperado: sin output (no hay comentarios)

# 5. Contar URLs en sitemap
curl -s https://altorracars.github.io/sitemap.xml | grep -c '<loc>'
# Esperado: 60+ URLs
```

## Commits relacionados
- `fix: clean sitemap.xml and robots.txt for Google Search Console indexing` — PR mergeado 24 mar 2026
- `resolve merge conflict in sitemap.xml — keep clean format + add new vehicles`

## Referencia: formato que funciona (Bersaglio Jewelry)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://bersagliojewelry.co/</loc>
        <lastmod>2026-03-19</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```
- Sin comentarios XML
- Indentación de 4 espacios
- Sin líneas en blanco entre entradas
- robots.txt simple con `Allow: /` y `Sitemap:` al final
