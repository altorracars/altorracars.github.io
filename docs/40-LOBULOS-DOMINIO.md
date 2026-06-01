# 🎯 40 — LÓBULOS DE DOMINIO (registry de áreas especializadas)

> **Nodo neuronal: registry de dominios especializados.** Mapa de los lóbulos
> en los que el cerebro puede crecer cuando el cliente solicita análisis
> especializado (Trigger 🔵 §G.2 en `CLAUDE.md`). Este archivo NO contiene
> los análisis — es el ÍNDICE de los lóbulos hijos (`41-SEGURIDAD`, `42-LEGAL`,
> etc.) que nacen on-demand con contenido real.
>
> **Regla clave (§G.4 Neurogénesis)**: los archivos hijos NO existen hasta que
> hay contenido REAL de una auditoría concreta. No crear vacíos por anticipado.
>
> **Mantenimiento**: cuando nazca un lóbulo hijo, agregar su fila a la tabla
> de abajo + registrarlo en `00-INDICE` + actualizar este registry para
> reflejar `🟢 vacío` → `🟠 activo`.

---

## 🗂️ Categorías esperadas

| ID | Lóbulo | Disparador (cliente dice…) | Estado | Cubre |
|---|---|---|---|---|
| **41** | Seguridad | "audita seguridad", "vulnerabilidades", "Firebase rules", "rutas sin auth" | 🟢 vacío | API auth, validación input, prevención inyecciones, manejo de secrets, rules check Firebase. |
| **42** | Legal/Compliance | "audita legal", "cookies", "privacidad", "GDPR", "Hábeas Data" | 🟢 vacío | Políticas, consentimientos, regulaciones aplicables (Colombia 1581/2012 etc.). |
| **43** | UX/Diseño | "audita UX", "interfaz", "accesibilidad visual" | 🟠 **activo** (R0 2026-05-29) | Patrones de interfaz, modernización de componentes, jerarquía visual. Hallazgos en `43-UX.md`. |
| **44** | SEO | "audita SEO", "rich snippets", "ranking", "indexación" | 🟢 vacío | Metadata, structured data, on-page, indexación. Complementa §90 historial. |
| **45** | Performance | "audita performance", "Core Web Vitals", "LCP/CLS/FID" | 🟢 vacío | Métricas reales (Lighthouse), bottlenecks. Complementa doctrina §17. |
| **46** | Escalabilidad | "audita escalabilidad", "arquitectura", "modernización código" | 🟢 vacío | Anti-deuda técnica, patrones, refactor estructural. |
| **47** | Copywriting | "audita copy", "voz", "tono", "headlines", "CTAs" | 🟢 vacío | Tono Altorra, microcopy, headlines, CTAs, mensajes de error. |
| **48** | Accesibilidad (a11y) | "audita a11y", "WCAG", "lectores de pantalla", "teclado" | 🟠 **activo** (R inicial 2026-05-31) | ARIA, contraste, navegación teclado, alt texts, foco visible. Hallazgos en `48-ACCESIBILIDAD.md`. |

**Categorías futuras**: cualquier dominio nuevo que el cliente pida análisis
(ej. analytics/49, marketing/50, devops/51) se agrega aquí + se crea el
archivo hijo cuando hay contenido real. La numeración 41+ está reservada
para lóbulos de dominio. No reutilizar.

---

## 🛠️ Recursos Externos Complementarios

`skills/` (carpeta + tool Skill) es **expertise general de terceros**
(anthropic-skills/, claude_code_skills/, superpowers/, etc.).
**NO es una neurona** — es un recurso paralelo, alimentado por el cliente.

**Workflow obligatorio al disparar Trigger 🔵 (§G.2 `CLAUDE.md`)**:
1. **Primero**: revisar qué skills están disponibles (lista en system reminders
   al arranque). Para el dominio solicitado, identificar skills relevantes.
   Ejemplos:
   - 🔒 **Seguridad** → revisar `skills/` por skills de security/auth/rules; en
     ausencia, usar conocimiento pre-entrenado + análisis directo.
   - 📜 **Legal** → idem.
   - 🎨 **UX/Diseño** → `frontend-design`, `impeccable`, `design-taste-frontend`,
     `emil-design-eng`, `redesign-existing-projects`, `minimalist-ui`, etc.
   - 🔍 **SEO** → `seo-audit`, `ai-seo`, `schema-markup`, `programmatic-seo`,
     `competitor-alternatives`.
   - ⚡ **Performance** → análisis directo + doctrinas §17.
   - 🏗️ **Escalabilidad** → análisis directo + experiencia de §119.
   - ✍️ **Copywriting** → `copywriting`, `copy-editing`, `email-sequence`,
     `cold-email`, `marketing-psychology`, `ad-creative`.
   - ♿ **Accesibilidad** → `impeccable` + análisis directo.
2. **Segundo**: si hay skill aplicable, invocarla vía tool `Skill` (`skill:
   "name"`). La skill da el FRAMEWORK analítico — qué revisar, en qué orden,
   con qué criterios.
3. **Tercero**: aplicar el framework al CÓDIGO real del proyecto. Capturar
   findings en el lóbulo hijo correspondiente (creándolo si no existe).
4. **Cuarto**: el lóbulo registra QUÉ skill usé y por qué — para sesiones
   futuras, primero consultar el lóbulo (que apunta a la skill correcta +
   las excepciones específicas del proyecto Altorra).

**Sinergia esperada**: skills externas (framework general) + lóbulos internos
(findings proyecto-específicos) → análisis cada vez más profundo y más
rápido, sin re-investigar lo aprendido. El cerebro acumula know-how
estratégico, no solo bugs históricos.

---

## 📐 Estructura de un lóbulo hijo (template)

Cuando nazca el primer lóbulo (ej. `docs/41-SEGURIDAD.md`), debe tener
esta forma — copiar/adaptar:

```markdown
# 🔒 41 — SEGURIDAD (lóbulo de dominio)

> Lóbulo registrado en `40-LOBULOS-DOMINIO`. Disparador: Trigger 🔵 §G.2
> con palabras "seguridad", "vulnerabilidades", "Firebase rules", etc.
> Mantenido por Claude bajo demanda del cliente.

## Skills consultadas
- `<nombre-skill>` (si aplica) — qué framework dio + dónde se aplicó al
  proyecto.

## Hallazgos (por ronda de auditoría)

### YYYY-MM-DD · Ronda inicial
- **Hallazgo 1**: descripción + severidad (low/med/high/critical) +
  ubicación (`file:line`) + recomendación.
- **Hallazgo 2**: …

### YYYY-MM-DD · Ronda N
…

## Excepciones / decisiones específicas del proyecto Altorra
- Por qué la regla genérica X NO aplica (con justificación verificable).
- Tradeoffs aceptados conscientemente.

## Pendientes / próxima ronda
- Áreas no cubiertas todavía.
- Hipótesis a verificar.
```

---

## 🛡️ Reglas de mantenimiento del registry

1. **No crear archivos hijos vacíos**. Solo nacen con contenido real.
2. **Cuando un lóbulo hijo nace**: actualizar la fila correspondiente en
   este registry (`🟢 vacío` → `🟠 activo`) + agregar fila en `00-INDICE`
   con su ubicación.
3. **Tope blando ~280 líneas para este archivo**. Si crece por encima
   (ej. el registry se vuelve un meta-índice de muchos sub-temas), shard
   por meta-categorías.
4. **Reflejo de Cierre (§G.4)**: tras una auditoría especializada,
   verificar antes de cerrar la tarea: ¿lóbulo hijo creado/actualizado?
   ¿skills consultadas registradas? Si no, vuelve y hazlo.
