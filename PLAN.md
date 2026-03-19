# Plan de Correcciones — Bugs Pendientes (5 puntos)

> **Fecha:** 2026-03-19
> **Contexto:** Estos 5 problemas persisten después de los PRs #321-#324.

---

## FASE A: Imágenes hero incorrectas (Puntos 1, 2, 3)

### Problema

Tres banners de marca muestran vehículos incorrectos o no identificables:

| # | Marca | Archivo | Problema actual |
|---|-------|---------|-----------------|
| 1 | Citroën | `multimedia/banner/b_citroen.png` | Muestra un auto viejo sin marca visible |
| 2 | Honda | `multimedia/banner/b_honda.png` | El vehículo NO es Honda |
| 3 | Mitsubishi | `multimedia/banner/b_mitsubishi.png` | No se ve el logo, marca no identificable |

### Solución

Descargar imágenes correctas de fuentes libres (Unsplash, Pexels, Pixabay) o generar con IA:

- **Citroën:** Citroën C3 o C5 Aircross, vista 3/4, logo visible
- **Honda:** Honda CR-V o Civic, vista 3/4, logo Honda visible en parrilla
- **Mitsubishi:** Mitsubishi Outlander o L200, vista 3/4, logo visible

**Requisitos de imagen:**
- Resolución: 1920×800px (consistente con banners existentes)
- Formato: JPEG (guardado como .png por convención del sitio)
- Composición: vehículo completo en vista 3/4, marca identificable
- Sin marcas de agua

### Archivos afectados
- `multimedia/banner/b_citroen.png`
- `multimedia/banner/b_honda.png`
- `multimedia/banner/b_mitsubishi.png`

### Limitación
No tengo capacidad de generar/descargar imágenes. Buscaré URLs de fuentes libres y las descargaré via `curl`, o el usuario las proporciona manualmente.

---

## FASE B: Bug de "Ver todas" — bloqueo total del puntero (Punto 4)

### Problema

Al hacer click en "Ver todas" del submenú de Marcas:
1. **No lleva a las coordenadas exactas** del carrusel de marcas
2. **BLOQUEA COMPLETAMENTE el puntero** — no se puede hacer click en nada (menús, imágenes, enlaces)

### Diagnóstico (causa raíz)

**Bug de bloqueo del puntero:**

La función `loadModalsIfNeeded()` en `js/components.js:28` **NO EXISTE** — nunca fue definida. Se llama pero falla silenciosamente. Esto significa que:

1. Los modals de `snippets/modals.html` NUNCA se inyectan dinámicamente
2. Los modals están hardcodeados SOLO en `index.html` (líneas 675-819)
3. El CSS de `.modal-overlay` en `css/contact-forms.css` tiene:
   ```css
   .modal-overlay {
       position: fixed;
       top: 0; left: 0; right: 0; bottom: 0;
       z-index: 9999;
       display: none;
   }
   ```
   Pero **NO tiene `pointer-events: none`** cuando está inactivo.

4. Cuando se navega con hash (`index.html#marcas`), hay una race condition:
   - El smooth scroll se ejecuta (línea 339, con 400ms delay)
   - Pero el dropdown del menú puede quedar en estado `.active` sin cerrarse
   - El overlay del dropdown o del menú móvil queda superpuesto

5. **Problema adicional en el smooth scroll:**
   - El click en "Ver todas" (`<a href="index.html#marcas">`) es interceptado por el handler de línea 344
   - El `e.preventDefault()` impide la navegación, y `history.replaceState` cambia el hash
   - Pero el menú dropdown/móvil NO se cierra explícitamente al hacer este click
   - El body puede quedar con `overflow: hidden` y `position: fixed` (del menú móvil)

### Solución

1. **Definir `loadModalsIfNeeded()`** en `js/components.js`:
   - Fetch `snippets/modals.html` e inyectarlo en el `<body>` de TODAS las páginas
   - Cargar `js/contact-forms.js` dinámicamente después de inyectar los modals

2. **Cerrar menú/dropdowns al hacer smooth scroll:**
   - En el click handler de smooth scroll (línea 344-377), después de `e.preventDefault()`:
     - Cerrar dropdowns: `document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'))`
     - Si menú móvil abierto: llamar a closeMenu() (o limpiar body classes)

3. **Agregar `pointer-events: none` al CSS de `.modal-overlay`:**
   ```css
   .modal-overlay { pointer-events: none; }
   .modal-overlay.active { pointer-events: auto; }
   ```

4. **Mejorar el smooth scroll:**
   - Aumentar delay de 400ms a 600ms para dar tiempo a que los componentes carguen
   - Verificar que el header no esté en estado `header--hidden` al scrollear

### Archivos afectados
- `js/components.js` — definir `loadModalsIfNeeded()`, cerrar menú al scroll
- `css/contact-forms.css` — agregar `pointer-events: none`

---

## FASE C: Modals de Financiación y Vende tu Auto solo en index (Punto 5)

### Problema

Los links "Financiación" y "Vende tu Auto" en el header (`data-modal="financiacion"` y `data-modal="vende-auto"`) NO funcionan en ninguna página excepto `index.html`.

### Diagnóstico (causa raíz)

Tres piezas faltan fuera de `index.html`:

1. **El HTML de los modals** (`snippets/modals.html`) nunca se inyecta — `loadModalsIfNeeded()` no existe
2. **El CSS de los modals** (`css/contact-forms.css`) no se carga en otras páginas
3. **El JS de los modals** (`js/contact-forms.js`) solo se incluye como `<script>` en `index.html:928`

### Solución

Implementar `loadModalsIfNeeded()` en `js/components.js` que:

```javascript
function loadModalsIfNeeded() {
    // No duplicar si ya hay modals en la página (como index.html que los tiene inline)
    if (document.getElementById('vende-auto-modal')) return;

    // 1. Inyectar HTML de modals
    fetch('snippets/modals.html')
        .then(r => r.ok ? r.text() : '')
        .then(html => {
            if (!html) return;
            var container = document.createElement('div');
            container.id = 'modals-container';
            container.innerHTML = html;
            document.body.appendChild(container);

            // 2. Cargar CSS si no existe
            if (!document.querySelector('link[href*="contact-forms.css"]')) {
                var css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = 'css/contact-forms.css';
                document.head.appendChild(css);
            }

            // 3. Cargar JS si no existe
            if (!document.querySelector('script[src*="contact-forms.js"]')) {
                var script = document.createElement('script');
                script.src = 'js/contact-forms.js';
                document.body.appendChild(script);
            }
        })
        .catch(function() { /* Silently fail — modals are non-critical */ });
}
```

### Archivos afectados
- `js/components.js` — implementar `loadModalsIfNeeded()`
- `css/contact-forms.css` — agregar `pointer-events: none` base (de Fase B)
- **No tocar** `index.html` — ya tiene los modals inline, el guard `if (document.getElementById('vende-auto-modal')) return;` los protege

---

## Orden de ejecución

| Orden | Fase | Descripción | Dependencia |
|-------|------|-------------|-------------|
| 1 | **B** | Fix bloqueo de puntero + smooth scroll | Ninguna |
| 2 | **C** | Modals en todas las páginas | Usa la misma función de Fase B |
| 3 | **A** | Reemplazar imágenes de Citroën, Honda, Mitsubishi | Independiente |

**Nota:** Las fases B y C se resuelven juntas ya que ambas dependen de implementar `loadModalsIfNeeded()`.

---

## Resumen técnico de causa raíz

```
loadModalsIfNeeded() ← FUNCIÓN FANTASMA (llamada pero nunca definida)
       │
       ├── Bug 4 (bloqueo puntero):
       │   ├── Modals no se inyectan → no se inicializan
       │   ├── CSS .modal-overlay sin pointer-events:none
       │   └── Menú no se cierra al smooth-scroll → body queda locked
       │
       └── Bug 5 (modals solo en index):
           ├── HTML de modals hardcoded en index.html
           ├── contact-forms.js solo cargado en index.html
           └── contact-forms.css solo cargado en index.html
```
