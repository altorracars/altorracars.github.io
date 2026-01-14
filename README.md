# ALTORRA CARS - Plataforma de Venta de Vehículos

## 🚗 Acerca del Proyecto

**ALTORRA CARS** es una plataforma moderna de venta de vehículos nuevos y usados en Cartagena, Colombia. Desarrollada con tecnología web estándar (HTML5, CSS3, JavaScript) para máxima compatibilidad y rendimiento.

### Características Principales

✅ **Catálogo Completo** - Vehículos nuevos, usados y seminuevos  
✅ **Búsqueda Avanzada** - Filtros por marca, precio, categoría, etc.  
✅ **Responsive Design** - Optimizado para móviles, tablets y desktop  
✅ **Sistema de Favoritos** - Guarda tus vehículos preferidos  
✅ **Integración WhatsApp** - Contacto directo instantáneo  
✅ **Sin Dependencias** - Solo HTML, CSS y JS vanilla  

---

## 📁 Estructura del Proyecto

```
altorracars.github.io/
├── index.html                 # Página principal
├── vehiculos-nuevos.html      # Catálogo de nuevos
├── vehiculos-usados.html      # Catálogo de usados
├── busqueda.html              # Búsqueda avanzada
├── contacto.html              # Formulario de contacto
├── favoritos.html             # Vehículos favoritos
├── nosotros.html              # Acerca de
├── marca.html                 # Página dinámica de marca
├── detalle-vehiculo.html      # Detalle del vehículo
│
├── css/
│   ├── style.css              # Estilos principales
│   └── mobile-fixes.css       # Correcciones móviles
│
├── js/
│   ├── components.js          # Carga de componentes
│   ├── database.js            # Gestión de datos
│   ├── render.js              # Renderizado de UI
│   ├── contact.js             # Formulario contacto
│   └── main.js                # Script principal
│
├── snippets/
│   ├── header.html            # Header reutilizable
│   └── footer.html            # Footer reutilizable
│
├── data/
│   └── vehiculos.json         # Base de datos de vehículos
│
├── multimedia/
│   ├── logo-placeholder.png
│   ├── hero-car.jpg
│   ├── vehicles/              # Imágenes de vehículos
│   ├── categories/            # Imágenes de categorías
│   └── brands/                # Logos de marcas
│
└── public/
    └── _redirects             # Configuración Netlify/GitHub
```

---

## 🚀 Despliegue en GitHub Pages

### Opción 1: Despliegue Automático (Recomendado)

1. **Push al repositorio**
```bash
git add .
git commit -m "Deploy ALTORRA CARS"
git push origin main
```

2. **Activar GitHub Pages**
   - Ve a: `Settings` → `Pages`
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
   - Click `Save`

3. **Espera 2-3 minutos** - Tu sitio estará disponible en:
   ```
   https://altorracars.github.io
   ```

### Opción 2: Con GitHub Actions (Avanzado)

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## 🛠️ Desarrollo Local

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Servidor local (opcional pero recomendado)

### Iniciar el Proyecto

**Opción 1: Live Server (VS Code)**
1. Instala la extensión "Live Server"
2. Click derecho en `index.html`
3. Selecciona "Open with Live Server"

**Opción 2: Python Simple Server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Opción 3: Node.js http-server**
```bash
npx http-server -p 8000
```

Abre tu navegador en: `http://localhost:8000`

---

## 📱 Compatibilidad Móvil

### ✅ Características Móviles

- **Menú Hamburguesa** - Navegación táctil optimizada
- **Touch Gestures** - Swipe y scroll suaves
- **Responsive Images** - Carga optimizada por tamaño
- **Mobile-First CSS** - Diseño desde móvil hacia arriba
- **WhatsApp Integration** - Click-to-chat directo

### 🧪 Probar en Móvil

1. **Chrome DevTools**
   - `F12` → Toggle Device Toolbar (`Ctrl+Shift+M`)
   - Prueba diferentes dispositivos

2. **Navegador Real**
   - Obtén tu IP local: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
   - En el móvil: `http://TU_IP:8000`

3. **GitHub Pages**
   - URL ya es responsive: `https://altorracars.github.io`

---

## 🗄️ Base de Datos de Vehículos

Los datos están en `data/vehiculos.json`:

```json
{
  "vehiculos": [
    {
      "id": 1,
      "marca": "chevrolet",
      "modelo": "Onix",
      "year": 2024,
      "precio": 75000000,
      "tipo": "nuevo",
      "categoria": "hatchback",
      "imagen": "multimedia/vehicles/chevrolet-onix-2024.jpg",
      ...
    }
  ]
}
```

### Agregar Nuevo Vehículo

1. Agrega la imagen en `multimedia/vehicles/`
2. Edita `data/vehiculos.json`
3. Agrega el nuevo objeto con todos los campos
4. Commit y push

---

## 🎨 Personalización

### Colores de Marca

Edita `css/style.css`:

```css
:root {
    --primary-gold: #b89658;      /* Dorado principal */
    --primary-brown: #916652;     /* Marrón */
    --primary-dark: #1d1b19;      /* Negro */
    --secondary-beige: #d1c4ac;   /* Beige */
    --accent-green: #38a28e;      /* Verde */
}
```

### Logo

Reemplaza `multimedia/logo-placeholder.png` con tu logo (recomendado: 200x70px, PNG transparente)

### Información de Contacto

Edita `snippets/footer.html` y `contacto.html`:
- Email: `altorracarssale@gmail.com`
- WhatsApp: `+57 323 501 6747`

---

## 🔧 Solución de Problemas

### Problema: Menú móvil no funciona

**Solución:**
1. Verifica que `css/mobile-fixes.css` está vinculado
2. Limpia caché del navegador (`Ctrl+Shift+R`)
3. Revisa la consola (`F12`) por errores

### Problema: Imágenes no cargan

**Solución:**
1. Verifica rutas relativas (sin `/` inicial)
2. Nombres de archivo exactos (case-sensitive)
3. Formatos soportados: JPG, PNG, WebP

### Problema: GitHub Pages muestra 404

**Solución:**
1. Verifica que el archivo se llama exactamente `index.html`
2. Espera 5-10 minutos después del push
3. Verifica en Settings → Pages que está activado

### Problema: Estilos no se aplican

**Solución:**
1. Fuerza recarga sin caché: `Ctrl+Shift+R`
2. Verifica orden de `<link>` en el HTML
3. Confirma que los archivos CSS existen

---

## 📊 Analíticas (Opcional)

### Google Analytics

Agrega antes del `</head>` en todas las páginas:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔐 SEO y Metadatos

Cada página incluye:
- Meta description única
- Open Graph tags para redes sociales
- Títulos optimizados
- Estructura semántica HTML5

---

## 📞 Soporte y Contacto

**ALTORRA CARS - ALTORRA Company SAS**

- 📧 Email: altorracarssale@gmail.com
- 📱 WhatsApp: +57 323 501 6747
- 📍 Ubicación: Cartagena, Bolívar, Colombia
- 🌐 Web: https://altorracars.github.io

---

## 📄 Licencia

© 2025 ALTORRA CARS - ALTORRA Company SAS. Todos los derechos reservados.

---

## 🚀 Próximas Mejoras

- [ ] Sistema de comparación de vehículos
- [ ] Calculadora de financiamiento
- [ ] Filtros avanzados por características
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Chat en vivo
- [ ] Galería de imágenes ampliada
- [ ] Reviews de clientes

---

**¡Gracias por usar ALTORRA CARS!** 🚗✨
