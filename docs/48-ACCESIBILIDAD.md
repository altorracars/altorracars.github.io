# ♿ 48 — ACCESIBILIDAD (a11y · lóbulo de dominio)

> Lóbulo registrado en `40-LOBULOS-DOMINIO` (fila §48). Disparador: Trigger 🔵 §G.2
> con "a11y", "WCAG", "lectores de pantalla", "teclado", "contraste", "foco".
> Mantenido por Claude bajo demanda del cliente. Criterio base: **WCAG 2.2 nivel AA**.

## Skills consultadas
- **`impeccable`** (invocada 2026-05-31, per mapeo del registry §40 "♿ → impeccable").
  **Hallazgo meta**: (1) su sub-referencia `reference/audit.md` (la que cubre a11y) **NO
  está materializada en disco** — solo existe `SKILL.md`. (2) `impeccable` es en esencia
  una skill de **creación/iteración de diseño** (craft/shape/polish/bolder), no de
  *compliance* WCAG. → Para auditorías a11y conviene **WCAG 2.2 AA directo** (conocimiento
  pre-entrenado). `impeccable` aporta sus "design laws" (color OKLCH, contraste, motion ease-out,
  bans de slop) como complemento de criterio visual, no como checklist de accesibilidad.
  **Recomendación futura**: usar la skill **`accessibility-audit`** (CREADA 2026-05-31 en
  `skills/accessibility-audit/` — encapsula el framework WCAG 2.2 AA: criterios verify-in-code,
  fórmula de contraste, rúbrica de severidad, recetas grep, falsos positivos comunes). Nació del
  hueco detectado en esta auditoría. `impeccable` solo si se va a *rediseñar* un componente.

## Hallazgos

### 2026-05-31 · Ronda inicial — catálogo cinematic en producción (§122–§146)
Alcance: sitio público cinematic (index, detalle, busqueda, marca, marcas, 4 landings SEO) +
chrome global (header/footer). Admin EXCLUIDO (fuera de SP-5.x, §43-UX). Verificado leyendo
código (§19), no en navegador (L-08 impide E2E real en localhost).

**🟠 MEDIA-ALTA**
- **A11Y-01 · Controles de filtro sin etiqueta programática** (WCAG 1.3.1 + 4.1.2, nivel A).
  En `marca.html` (l.112-144), las 4 landings y `busqueda.html`, los `<label>Tipo</label>`,
  `<label>Precio</label>`, etc. NO tienen `for=` ni envuelven al control → un lector de pantalla
  anuncia "cuadro combinado" sin nombre. **Inconsistente**: el dropdown de orden SÍ está bien
  (`<label for="sortBy">`). Los selects ya tienen `id` (`tipoSelect`, `marcaSelect`…) → **fix
  barato**: añadir `for="<id>"` a cada label (o `aria-label` al control). Alto impacto (los filtros
  son la interacción central del catálogo).

**🟡 MEDIA**
- **A11Y-02 · Las 4 landings SEO no tienen `<h1>`** (WCAG 1.3.1 + 2.4.6; además SEO). `grep <h1`
  en `vehiculos-{suv,pickup,sedan,hatchback}.html` → 0. `busqueda.html` sí tiene `<h1 class="sr-only">`;
  las landings ni eso. Irónico siendo páginas SEO. **Fix**: `<h1>` (visible o `sr-only`) tipo
  "SUVs Usados en Cartagena" — suma a11y **y** SEO.
- **A11Y-03 · Contraste de `--cin-ink-faint` ≈ 2.5:1** (WCAG 1.4.3, nivel AA — falla). Token
  `rgba(244,238,222,0.32)` sobre `--cin-bg #08070A` ≈ **2.5:1** (AA pide 4.5:1 texto normal / 3:1
  grande). Usado **41× en 7 CSS** cinematic. **Heredado del index §122** (ya en prod desde antes
  — NO es regresión de §141-146). **Fix**: subir opacidad 0.32→~0.5 (≈4:1) o restringirlo a uso
  decorativo/no-texto (verificar instancia por instancia: eyebrow/caption/meta vs texto esencial).
- **A11Y-04 · Sin enlace "Saltar al contenido"** (WCAG 2.4.1 Bypass Blocks, nivel A). El header
  global (`snippets/header.html`) tiene buen ARIA (aria-label en logo/nav/botones) pero NO hay
  skip-link → con teclado hay que tabular toda la nav en cada página. (Admin tenía uno, removido
  por cliente §45.) **Fix**: primer elemento focusable = `<a class="sr-only" href="#main">` (la
  utilidad `.sr-only` ya existe).

**🟢 BAJA-MEDIA**
- **A11Y-05 · Indicador de foco débil en campos de formulario** (WCAG 2.4.7, nivel AA). Filtros/
  búsqueda/orden usan `outline:none` + cambio sutil de `border-color` (dorado @45%). Los enlaces/
  botones SÍ conservan el outline por defecto del browser (verificado: el CSS legacy NO lo elimina
  globalmente). El `:focus-visible{outline:2px gold}` global vive en `base-redesign.css` que **NO**
  cargan las páginas del catálogo (solo el index). **Fix**: añadir `body[data-cin] :focus-visible
  {outline:2px solid var(--cin-gold);outline-offset:2px}` en `soft-redesign.css` (cubre todo el
  catálogo de una).
- **A11Y-06 · CSS per-page sin `prefers-reduced-motion`** (WCAG 2.3.3, nivel AAA / buena práctica).
  `marca-cinematic.css` tiene 14 reglas transition/transform/animation y 0 guardia; igual
  detalle/busqueda/marcas-cinematic. `cinematic.css`/`chrome-redesign`/`quicktools` SÍ guardan →
  inconsistente. **Fix**: bloque `@media (prefers-reduced-motion:reduce)` por archivo, o uno global
  en `soft-redesign.css`.

**✅ PASA (documentado para no re-flaggear)**
- Contraste texto: `--cin-ink` #F4EEDE ≈ **17:1** (AAA), `--cin-ink-soft` (0.62) ≈ **6.8:1** (AA),
  `--cin-gold` #D4A85A ≈ **9.1:1** (AAA) sobre `--cin-bg`. Texto principal/secundario/dorado OK.
- Tarjeta de vehículo (`render.js`): `<img alt="${altText}">` + `favorite-btn`/`btn-compare` con
  `aria-label` + `aria-pressed`. Bien.
- `<html lang="es">` en todas las páginas (WCAG 3.1.1). ✅
- Header global: `aria-label` en logo, nav ("Navegación principal"), publish, favoritos, menú móvil. ✅
- `#page-loader` con `role="status"` + `aria-label`. ✅
- CSS legacy NO elimina outlines de foco globalmente (links/botones mantienen foco visible). ✅

### 2026-05-31 · Fixes aplicados (ADR §147)
**RESUELTOS** (batch aprobado por el cliente):
- **A11Y-01** ✅ → `aria-label` en los **50 controles** de filtro (selects + inputs precio/año/km) de `marca.html` + 4 landings + `busqueda.html`. Se eligió `aria-label` sobre `for=` por **markup inconsistente entre archivos** (suv usa `class="filter-label"`, hatchback minificado, orden de atributos dispar) → uniforme y 100% aditivo; `id`/`name`/JS intactos. Las **18 `marcas/*` heredan vía cron regen** (el generador usa `new Date()` → no se corrió a mano para no meter diffs de fecha).
- **A11Y-02** ✅ → `<h1 class="sr-only">{Categoría} Usados en Cartagena</h1>` en las 4 landings.
- **A11Y-05** ✅ → `body[data-cin="on"] :focus-visible { outline: 2px solid var(--cin-gold-hot) }` en `soft-redesign.css` (cubre TODO el catálogo, no solo el index).
- **A11Y-06** ✅ → `@media (prefers-reduced-motion: reduce)` en `soft-redesign.css`.

**A11Y-03** ✅ **RESUELTO en §148** (2026-06-01): `--cin-ink-faint` `rgba(…,0.32)`→`0.50` en `cinematic.css` + `soft-redesign.css` → ≈4.7:1 sobre `--cin-bg`, pasa WCAG AA 1.4.3. Aprobado por el cliente (cambio transversal al texto tenue).

**A11Y-04** ✅ **RESUELTO en §149** (2026-06-01): `.skip-link` (`style.css` + `base-redesign.css`) + enlace en `snippets/header.html` (64 páginas) + header inline del index + **`ensureMainLandmark()` en `components.js`** que inserta `<div id="main" tabindex="-1">` tras el header en TODAS las páginas (DRY — sin tocar el markup de ~20 páginas, sin clobberear ids como `#compare-root`; las 45 generadas heredan en runtime). Verificado §19: 0 dependencias del hermano-adyacente del header. `transform` no `top` (§17.2), sin observer (§3.5), reduced-motion OK.

✅ **LÓBULO §48: las 6 findings (A11Y-01…06) RESUELTAS.** Quedan solo pendientes que requieren herramienta/dispositivo real (ver abajo): lector de pantalla, target-size móvil, orden de foco lightbox/comparador.

## Excepciones / decisiones específicas Altorra
- **A11Y-03 (ink-faint) NO es regresión de SP-5.3**: nace con el diseño del index (§122), ya
  desplegado. Se documenta aquí pero su fix es transversal al sistema cinematic, no del catálogo.
- **Admin fuera de alcance**: el skip-link de admin se removió por pedido del cliente (§45); admin
  está excluido del rediseño SP-5.x (§43-UX). Esta auditoría cubre solo el sitio público.
- **Relación con §43-UX**: §43 cubre patrones visuales/UX; §48 cubre WCAG técnico (contraste medible,
  teclado, ARIA, labels). El "accesibilidad visual" del registry §43 se entiende como jerarquía/
  legibilidad; el compliance medible vive aquí.

## Pendientes / próxima ronda
- **Verificación con tecnología asistiva real**: lector de pantalla (NVDA/VoiceOver) + recorrido
  solo-teclado. No se puede en localhost (L-08); requiere prod o entorno con Firebase desbloqueado.
- **Orden de foco + trampa de foco** en componentes interactivos del detalle (lightbox de galería,
  barra sticky) y en el comparador flotante.
- **Target size táctil** (WCAG 2.5.8, nivel AA en 2.2): ¿botones/iconos ≥24×24px en móvil? (favorito,
  comparar, iconos de la fila de acciones del detalle).
- **Estados de error/validación** de formularios (si se añaden) — `aria-invalid`, mensajes asociados.
- Cuantificar cuántas de las 41 instancias de `--cin-ink-faint` son texto esencial vs decorativo.
