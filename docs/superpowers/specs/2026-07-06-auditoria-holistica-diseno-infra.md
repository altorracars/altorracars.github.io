# 🔎 Auditoría holística — Diseño + Infraestructura (mandato dueño 2026-07-06) ⟦OPUS-4.8⟧

> **Origen**: feedback del dueño con evidencia (screenshots del panel Atributos + PageSpeed móvil/desktop).
> **Directiva Permanente TODO-52**: pulir hasta "respira top mundial". Este spec = SSoT de hallazgos + prioridad.
> **Bloqueados (sin dinero)**: flip LLM del bot (#917) · migración Cloudflare (dominio). NO tocar.
> **Método de verificación**: preview local para lo público; para el panel admin = build Vite + mock; **VISUAL
> holístico = extensión Chrome** (el dueño la conecta; "un render funcional ≠ buen diseño"). Screenshot: L-28
> (cuelga tras resize) → medir por DOM/computed, o extensión `computer`.

---

## P0 — Diseño premium del PANEL (corazón del EPIC)
- ✅ **Atributos: grilla a masonry** — `display:grid` alineaba filas a la tarjeta más alta → huecos. Fix: `columns` (ADR pend). `admin-app/src/styles/lists.css`. HECHO+verificado 2026-07-06 (`4e35145a`).
- ⬜ **Barrido holístico del panel** (otras páginas): el dueño reporta "así en muchos lugares" — alineación/huecos/orden/espaciado inconsistente. Requiere recorrer cada módulo (inbox/pipeline/agenda/contactos/vehículos/dashboard/reportes/hub) con la extensión Chrome logueado + medir. Buscar: grids con huecos, tarjetas de altura desigual, ritmo vertical inconsistente, densidad, jerarquía visual.

## P1 — Accesibilidad pública (PageSpeed: móvil 87 / desktop 88 → objetivo ≥95)
- ⬜ **`qt-dock role="menu"` sin hijos `menuitem`** (`js/public/home/quicktools.js` + `css/home/quicktools.css`): un `role=menu` exige hijos `role=menuitem`; los `.qt-item` son `<a>` sin rol → error ARIA **Y** "árbol de accesibilidad mal formado" (categoría Navegación Agéntica 1/2). Fix: quitar `role=menu` (es una barra de nav → `<nav aria-label>` o `role=toolbar`), no un menú de comandos.
- ⬜ **Contraste footer** (`snippets/footer.html` `.alt-footer-bottom-link` en `.footer-bottom`): Términos/Privacidad/Cookies < AA. Subir contraste del texto.
- ⬜ **Áreas táctiles CTA bot** (`css/concierge.css`): `.cnc-cta-bubble-close` (×) + `.cnc-cta-bubble` muy chicas/juntas (<24px o sin spacing). Agrandar/espaciar.
- ⬜ **Botones sin nombre accesible** (móvil): auditar los `<button>` sin `aria-label`/texto.

## P2 — CLS + perf quirúrgica pública (CLS 0.034-0.046; LCP móvil 22.6s ⚠️)
- ⬜ **Imágenes sin `width`/`height` explícitos** → CLS + reserva de layout. Añadir dims a los `<img>` que falten (grep).
- ⬜ **14 animaciones NO compuestas** → violan §3.1 (solo transform/opacity). Auditar los 14 elementos, convertir a compuestas o `will-change` acotado.
- ⬜ **>4 preconnect** (advertencia): los templates tienen 4 (googleapis/gstatic/www.gstatic/firestore). Recortar a los 2 críticos + `dns-prefetch` el resto.
- ⬜ **Solicitudes que bloquean el render** (~900ms móvil): diferir CSS/JS no crítico.

## P3 — Perf infraestructura (más grande; LCP móvil 22.6s es el gran objetivo)
- ⬜ **Minificar JS/CSS público** (142 KiB JS + 32 KiB CSS): el sitio vanilla NO minifica. Necesita un paso de build/minify (¿workflow CI? — sin romper la simplicidad vanilla). Alto impacto.
- ⬜ **JS/CSS sin usar** (690 KiB JS · 87 KiB CSS): code-split / defer / cargar por-página lo que hoy es global.
- ⬜ **JS duplicado** (8 KiB): ¿Firebase cargado 2×? Investigar.
- ⬜ **Payload enorme** (móvil 8660 KiB): imágenes (ya AVIF/WebP §91) + JS. Auditar qué pesa.
- ⬜ **Cache lifetimes** (3456 KiB móvil): GitHub Pages `max-age=600` (control limitado); el SW ya mitiga. Evaluar.
- ⬜ Reducir ejecución JS (2.4s) / trabajo del hilo principal (móvil 10.8s / desktop 5.2s) / 12-13 tareas largas.

## P4 — Revisión holística con extensión Chrome (el dueño la conduce/señala)
- ⬜ Con la extensión: recorrer PageSpeed (pestañas NO pegadas: "Ver gráfico de rectángulos", "Árbol de dependencia de red", "Causantes de CLS", "Terceros", "Desglose de LCP") + el render vivo de cada superficie (público + panel logueado) para cazar lo que el DOM no ve (spacing, jerarquía, color, "premium tipo software").

---

## Orden sugerido de ejecución
1. **P1 completo** (a11y — quick, verificable en preview local, sube el score ya). 
2. **P2 completo** (CLS + preconnect — quick, mueve el CLS/LCP).
3. **P0 barrido del panel** (con extensión Chrome logueado — el dueño señala).
4. **P3 minificación** (el gran salto de LCP móvil — evaluar el approach de build sin romper vanilla).
5. **P4 continuo** (extensión, transversal).

> Cada bloque cerrado → ADR + fila `00` + este spec tickeado. Cache: code-only → SW sirve fresco (L-65).
