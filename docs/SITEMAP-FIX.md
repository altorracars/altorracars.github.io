# Sitemap & Google Search Console — Estado y Seguimiento

## Problema
Google Search Console muestra "No se ha podido leer el sitemap" para `https://altorracars.github.io/sitemap.xml`.
Bersaglio Jewelry (`bersagliojewelry.co`) se indexó de inmediato; Altorra Cars no.

## Diagnóstico #1 (24 mar 2026)

### Causas identificadas y corregidas
| Problema | Archivo | Fix aplicado |
|----------|---------|-------------|
| `Disallow: /*.json$` con `$` no estándar | `robots.txt` | Eliminado, simplificado al estilo Bersaglio |
| Sin `Allow: /` explícito en `User-agent: *` | `robots.txt` | Agregado |
| Bloqueo excesivo de bots (AhrefsBot, SemrushBot, etc.) | `robots.txt` | Eliminado |
| Comentarios HTML dentro del XML (`<!-- -->`) | `sitemap.xml` | Eliminados |
| Líneas en blanco entre entradas XML | `sitemap.xml` | Eliminadas |
| Script de generación inyectaba formato sucio | `generate-vehicles.mjs` | Reescrito `generateSitemap()` |

**Resultado**: Google Search Console siguió mostrando "No se ha podido obtener" al 8 abr 2026. El fix técnico fue correcto pero Google no reintentó el fetch.

---

## Diagnóstico #2 (8 abr 2026)

### Verificación técnica actual
- `curl -sI` como Googlebot: **HTTP/2 200**, `content-type: application/xml`, 13121 bytes
- XML válido, sin BOM, sin caracteres ocultos
- Todas las URLs del sitemap retornan HTTP 200
- `robots.txt` sirve correctamente con directiva `Sitemap:`
- No hay archivos `_headers` ni redirecciones que afecten el sitemap

### Nuevas causas identificadas y corregidas
| Problema | Archivo | Fix aplicado |
|----------|---------|-------------|
| `robots.txt` con bloques User-agent redundantes (Googlebot, Bingbot, Googlebot-Image) que añaden ruido | `robots.txt` | Simplificado a un solo bloque `User-agent: *` como Bersaglio |
| `generateSitemap()` usaba `today` como `lastmod` para TODAS las páginas estáticas en cada ejecución (cada 4h) — Google ignora lastmod si siempre muestra la fecha actual | `generate-vehicles.mjs` | Páginas estáticas ahora usan fecha fija; solo se actualiza cuando el contenido realmente cambia |
| `changefreq: daily` en homepage y búsqueda — agresivo para páginas que no cambian a diario | `sitemap.xml` + `generate-vehicles.mjs` | Cambiado a `weekly` |

### Por qué Google no reintentó desde el 24 de marzo
Google Search Console hizo un fetch el 24 mar 2026 (cuando el sitemap aún tenía problemas), recibió un error, y marcó el sitemap como "No se ha podido obtener". Desde entonces **no ha reintentado** (última lectura: 24/3/26). Esto es normal para subdominios `.github.io` — Google les da menor prioridad de crawl.

## Acciones para el usuario (Google Search Console)

### Paso 1: Re-enviar el sitemap
1. Ir a [Search Console > Sitemaps](https://search.google.com/search-console/sitemaps)
2. Hacer click en los 3 puntos junto a `/sitemap.xml` → **Eliminar sitemap**
3. En "Añadir un sitemap", escribir `sitemap.xml` → **ENVIAR**
4. Esperar 5-10 minutos y verificar que el estado cambie a "Correcto"

### Paso 2: Forzar re-indexación
1. Ir a **Inspección de URLs** en Search Console
2. Pegar: `https://altorracars.github.io/sitemap.xml`
3. Click en **Solicitar indexación**
4. Repetir para la homepage: `https://altorracars.github.io/`

### Paso 3: Ping a Google (opcional, para acelerar)
Abrir estas URLs en el navegador para notificar a Google de la actualización:
- `https://www.google.com/ping?sitemap=https://altorracars.github.io/sitemap.xml`

### Paso 4: Verificar en 48h
- Si el estado cambió a "Correcto" y muestra páginas descubiertas → resuelto
- Si sigue en error → considerar dominio personalizado (ver sección abajo)

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

---

## Por qué Bersaglio Jewelry SÍ se indexa y Altorra Cars NO

**Repo de referencia:** https://github.com/bersagliojewelry/bersagliojewelry.github.io
**Sitio live:** https://bersagliojewelry.co

### La diferencia principal: dominio propio

Bersaglio usa un **dominio personalizado** (`bersagliojewelry.co`) mediante un archivo `CNAME` en `public/`. Google trata dominios propios con mayor autoridad que subdominios `*.github.io`. Esto afecta directamente:
- **Crawl priority**: Google asigna más recursos de rastreo a dominios propios
- **Canonical URLs**: todas las URLs apuntan a `bersagliojewelry.co`, nunca a `github.io`
- **Trust signals**: un dominio `.co` da más confianza al crawler que un subdominio gratuito

### Comparación técnica completa

| Aspecto | Altorra Cars | Bersaglio Jewelry |
|---------|-------------|-------------------|
| **Dominio** | `altorracars.github.io` (subdominio gratuito) | `bersagliojewelry.co` (dominio propio via CNAME) |
| **Build** | Sin build (archivos estáticos directo) | Vite + Terser minificación → `dist/` |
| **Deploy** | GitHub Actions copia archivos al root | GitHub Actions build → deploy artifact `dist/` |
| **Sitemap ubicación** | `sitemap.xml` en raíz del repo | `public/sitemap.xml` (Vite lo copia a `dist/`) |
| **Sitemap generación** | Auto-generado por `generate-vehicles.mjs` | Manual/estático, 24 URLs curadas |
| **Sitemap prioridades** | Todas iguales (0.8) | Jerarquía: homepage 1.0, colecciones 0.85-0.9, productos 0.8, legales 0.3 |
| **robots.txt** | Simple: Allow + Sitemap | Estratégico: bloquea admin, carrito, wishlist, dist/ |
| **URL canónica** | No tiene `<link rel="canonical">` | Sí: `<link rel="canonical" href="https://bersagliojewelry.co/">` |
| **Meta robots** | No tiene | `<meta name="robots" content="index, follow">` |
| **Open Graph** | No tiene / parcial | Completo: og:type, og:url, og:title, og:description, og:image (1200x630) |
| **Twitter Cards** | No tiene | `summary_large_image` con todos los tags |
| **Structured Data (JSON-LD)** | No tiene | 2 schemas: `JewelryStore` + `WebSite` con SearchAction |
| **PWA** | No | Sí: manifest.json, service worker, offline.html |
| **Performance hints** | No | preconnect, dns-prefetch, preload con fetchpriority="high" |

### Lo que Bersaglio hace que Altorra Cars debería implementar

#### 1. Dominio personalizado (IMPACTO ALTO)
```
# Archivo: public/CNAME (o CNAME en raíz)
altorracars.co
```
- Comprar dominio (ej: `altorracars.co`, `altorracars.com`)
- Crear archivo `CNAME` con el dominio
- Configurar DNS del dominio → GitHub Pages
- Actualizar TODAS las URLs en sitemap.xml, robots.txt, y meta tags

#### 2. URL canónica en cada página (IMPACTO ALTO)
```html
<link rel="canonical" href="https://altorracars.github.io/">
<meta name="robots" content="index, follow">
```

#### 3. Structured Data JSON-LD (IMPACTO MEDIO-ALTO)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Altorra Cars",
  "url": "https://altorracars.github.io",
  "logo": "https://altorracars.github.io/logo.png",
  "address": { ... },
  "sameAs": [ /* redes sociales */ ]
}
</script>
```

#### 4. Open Graph y Twitter Cards (IMPACTO MEDIO)
```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://altorracars.github.io/">
<meta property="og:title" content="Altorra Cars - Vehículos Premium">
<meta property="og:description" content="...">
<meta property="og:image" content="https://altorracars.github.io/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

#### 5. Prioridades diferenciadas en sitemap (IMPACTO BAJO)
```xml
<!-- Homepage -->
<priority>1.0</priority>
<!-- Páginas de marca (BMW, Porsche, etc.) -->
<priority>0.9</priority>
<!-- Vehículos individuales -->
<priority>0.8</priority>
<!-- Páginas legales/secundarias -->
<priority>0.3</priority>
```

### Resumen: por qué Bersaglio se indexa de inmediato

Bersaglio trata su repo de GitHub Pages como un **mecanismo de hosting**, no como el producto final. Implementa el playbook completo de SEO profesional:
1. Dominio propio → mayor autoridad y crawl priority
2. Canonical URLs → evita contenido duplicado con github.io
3. Structured Data → Google entiende qué tipo de negocio es
4. Meta tags completos → Open Graph + Twitter + robots
5. Sitemap curado → prioridades y frecuencias estratégicas
6. robots.txt inteligente → bloquea páginas sin valor SEO
7. PWA + Performance → mejores Core Web Vitals → mejor ranking

**Altorra Cars**, al corregir el formato del sitemap y robots.txt, resolvió el blocker técnico. Pero para igualar la velocidad de indexación de Bersaglio, necesita implementar al menos los puntos 1-4.

### Referencia: formato de sitemap que funciona
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

### Referencia: robots.txt de Bersaglio
```
User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /admin-colecciones.html
Disallow: /admin-consultas.html
Disallow: /admin-piezas.html
Disallow: /dist/
Disallow: /carrito.html
Disallow: /lista-deseos.html

Sitemap: https://bersagliojewelry.co/sitemap.xml
```
