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
| **41** | Seguridad | "audita seguridad", "vulnerabilidades", "Firebase rules", "rutas sin auth" | 🟠 **activo** (auditoría Fase C 2026-06-08) | API auth, validación input, prevención inyecciones, manejo de secrets, rules check Firebase. **9 hallazgos + plan de blindaje en `41-SEGURIDAD.md`**. |
| **42** | Legal/Compliance | "audita legal", "privacidad", "Hábeas Data", "términos", "garantía", "RUNT/SOAT" | 🟠 **activo** (investigación Fase C 2026-06-08) | Marco legal de **vehículos usados Colombia** (Ley 1581/1480/769, SARLAFT). Fuentes `.gov.co` + gate abogado. Hallazgos en `42-LEGAL.md`. |
| **43** | UX/Diseño | "audita UX", "interfaz", "accesibilidad visual" | 🟠 **activo** (R0 2026-05-29) | Patrones de interfaz, modernización de componentes, jerarquía visual. Hallazgos en `43-UX.md`. |
| **44** | SEO | "audita SEO", "rich snippets", "ranking", "indexación" | 🟢 vacío | Metadata, structured data, on-page, indexación. Complementa §90 historial. |
| **45** | Performance | "audita performance", "Core Web Vitals", "LCP/CLS/FID" | 🟢 vacío | Métricas reales (Lighthouse), bottlenecks. Complementa doctrina §17. |
| **46** | Arquitectura & Escalabilidad | "audita escalabilidad", "arquitectura", "modernización código", "monolito", "desacoplar" | 🟠 **activo** (mandato arquitecto 2026-06-05) | Doctrina de arquitectura + decisiones right-sized (serverless event-driven Firebase, cero monolitos, seguridad por diseño, costo $0). Contenido en `46-ESCALABILIDAD.md`. |
| **47** | Copywriting | "audita copy", "voz", "tono", "headlines", "CTAs" | 🟢 vacío | Tono Altorra, microcopy, headlines, CTAs, mensajes de error. |
| **48** | Accesibilidad (a11y) | "audita a11y", "WCAG", "lectores de pantalla", "teclado" | 🟠 **activo** (R inicial 2026-05-31) | ARIA, contraste, navegación teclado, alt texts, foco visible. Hallazgos en `48-ACCESIBILIDAD.md`. |

**Categorías futuras**: cualquier dominio nuevo que el cliente pida análisis
(ej. analytics/49, marketing/50, devops/51) se agrega aquí + se crea el
archivo hijo cuando hay contenido real. La numeración 41+ está reservada
para lóbulos de dominio. No reutilizar.

---

## 🛠️ Recursos Externos Complementarios

`skills/` (carpeta + tool Skill) es **expertise general de terceros**.
**NO es una neurona** — es un recurso paralelo, alimentado por el cliente.

> 📖 **Catálogo completo de las skills del repo → `docs/skills-inventory.md`**
> (~88 skills + anomalías, auditado 2026-06-03). Consúltalo al disparar Trigger 🔵
> para saber QUÉ skill tienes para un dominio.
>
> 🌐 **Doctrina de VISIBILIDAD (HUB · ADR §244, TODO-42)**: para SEO/AEO/GA4/GSC/Maps/SSG/feeds/imágenes
> de CUALQUIER proyecto → **paquete de 7 skills portables** (`ssg-static-prerender`·`semantic-schema-aeo`·
> `ga4-lead-tracking`·`maps-gbp-local`·`search-console-setup-y-diagnostico`·`product-feeds`·`image-pipeline`)
> + agente `seo-auditor`. Modelo **Altorra=HUB**: construye/propaga skills+agentes y consolida los cerebros.
> Arquitectura: **`tenant_config.json` por proyecto + Core Library IoC (funciones puras) + D′ vendored**
> (sin lockstep, $0). Reglas duras: schema-en-HTML-del-build · **cero-demo** · status:published · NAP maestro ·
> Consent v2. El conocimiento PORTABLE vive en las skills (no aquí); esto es solo el puntero + el modelo HUB.
>
> ⚠️ **Estructura real**: `skills/` es **plano** (`skills/<nombre>/SKILL.md`), NO tiene
> subcarpetas `anthropic-skills/` ni `superpowers/`. Y **el repo NO es la fuente** de
> las skills cargadas en sesión: mi config solo habilita el plugin `superpowers` +
> `~/.claude/skills/crm-architect`; el namespace `anthropic-skills:*` es bundle del
> entorno. El solape de nombres es curaduría del cliente, no cableado. Detalle en la hoja.

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
   - ♿ **Accesibilidad** → skill **`accessibility-audit`** (CREADA — framework WCAG 2.2 AA) +
     análisis directo. (`impeccable` = creación/rediseño de UI, NO compliance.)
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

## 🌱 Reflejo de Sugerencia de Skills (neurogénesis de skills, no solo de neuronas)

Acordado con el cliente (2026-05-31). Las skills REPOTENCIAN al cerebro y a Claude con
capacidad reusable. Distinto de crear un lóbulo: aquí proponemos crear una **skill**.

**Regla de oro (la frontera)**: **Skill** = capacidad/framework GENERAL y PORTABLE (sirve en
*cualquier* proyecto). **Neurona/lóbulo** = conocimiento **Altorra-específico**. Si lo aprendido
es portable → candidato a skill; si es del proyecto → al cerebro. (No duplicar uno en el otro.)

**Flujo**: (1) detecto un hueco de capacidad reusable mientras trabajo → (2) lo **SUGIERO** al
cliente con justificación (qué resolvería, por qué es portable) → (3) **el cliente DECIDE** →
(4) si aprueba, leo la skill `skill-creator` y la creo según sus parámetros (SKILL.md con
frontmatter `name`+`description` "pushy" para el trigger, progressive disclosure, `references/`
para el detalle; **⚠️ `description` ≤ 1024 caracteres PARSEADOS** — lo exige el uploader de
skills, verificar el largo antes de instalar) en `skills/<nombre>/` → (5) la **registro** en el lóbulo relevante (sección
"Skills consultadas") + en `00-INDICE` (ruta del dominio).

**Skills creadas así**:
- **`accessibility-audit`** (2026-05-31) — framework WCAG 2.2 AA. Nació del hueco en la auditoría
  a11y (lóbulo §48): no existía skill de *compliance* (`impeccable` es solo creación de diseño).
  Descripción **optimizada manualmente** contra 20 queries (10 trigger / 10 near-miss) con
  exclusiones explícitas para evitar sobre-disparo. ⚠️ **Gotcha**: el loop automático
  `skill-creator/scripts/run_loop.py` (optimización de descripción) usa `claude -p` headless,
  que dio **`401 Invalid authentication credentials`** en esta sesión → no corre sin el CLI
  `claude` autenticado. Fallback = optimización manual (válida per el propio skill-creator).
- **`crm-architect`** (añadida por el CLIENTE 2026-06-02, commit `6cc0055`) — framework para CONSTRUIR/reconstruir
  CRMs sobre Firebase + Firestore + Cloud Functions, con vertical `automotive-dealership` (concesionario) +
  RBAC + Ley 1581. Es el framework de la **reconstrucción del CRM de Altorra** (Foco/handoff en `10`). Trae
  templates + scaffold en `skills/crm-architect/`. NO es lóbulo (capacidad portable); el conocimiento
  Altorra-específico del CRM (schema real, módulos, decisiones) irá a `20-ESPACIAL` + ADRs a medida que se construya.
- **`comite-expertos` · `legal-colombia` · `arquitecto-software`** (Fase B, registradas 2026-06-08, ADR §168) —
  **globales y portables**, viven en `~/.claude/skills/`, construidas por el cliente en una **sesión paralela**
  (contexto Bersaglio). Sirven a TODOS sus proyectos (Altorra Cars/Inmobiliaria + Bersaglio); **regla: la skill se deja
  funcional para todos** (lo de cada proyecto va al lóbulo del repo, NUNCA a la skill → por eso traen ejemplos de joyería).
  - **`comite-expertos`** = mejora ×3 de una respuesta: expertos **dinámicos por tema** + 3 niveles (pulido / auto-crítica /
    comité ×3) + 4ª voz externa (Gemini/`15`, humano en el medio). Adapta `llm-council` (peer-review anónimo + presidente)
    sin adoptarla (panel fijo/1 nivel/HTML). On-demand, lo dispara el cliente.
  - **`legal-colombia`** = guardrail + método: bloquea jurisdicción Colombia, fuentes oficiales `.gov.co`, **veta** plugins
    legales US (`legal:*`,`legalzoom:*`), gate de abogado antes de publicar. En Altorra **espera leer el lóbulo `42-LEGAL`**
    (ley de VEHÍCULOS — pendiente). Doctrina always-on ya en `CLAUDE.md §G.2` Trigger 🔵.
  - **`arquitecto-software`** = "piensa como arquitecto antes de codear": 6 lentes (negocio/escala/seguridad/costo/
    mantenibilidad/integración) + Impact Analysis + "contexto manda, no microservicios por moda". Es la versión afinada que
    hace innecesario adoptar `engineering:architecture`/`system-design` (genéricas, asumen SaaS/cloud pago). Doctrina always-on
    en `CLAUDE.md §3.8`; manifiesto en `46-ESCALABILIDAD`.
  - 🧮 **Límite `description` ≤1024 (instalador manual)** — regla segura: **≤1024 BYTES UTF-8** (si bytes ≤1024,
    chars también; los acentos/flechas `→ é ñ` pesan doble). **Medir con node** (`Buffer.byteLength`/`.length`),
    NO con `wc -m`. **Audit 2026-06-23** (94 `SKILL.md` × 5 ubicaciones: 4 repos + `~/.claude/skills/`): **0 sobre
    1024**. La nota vieja (`comite-expertos` 1038 / `legal-colombia` 1148) era STALE — hoy miden 915 / **1014** bytes
    (ya recortadas). Único caso real: `validacion-live-chrome` 1222→**953 chars / 964 bytes ✅** (el dueño chocó el
    límite al instalar manual). ⚠️ **Vigilar**: `legal-colombia` 1014 bytes = solo 10 de margen (no editar aún: bajo
    límite + skill co-editada en paralelo). **Gate**: `npm run skills:desc-check` (`scripts/skill-desc-check.mjs`, sale 1 si alguna >1024).
- **`validacion-live-chrome`** (2026-06-23, TODO-36 → ADR §232) — INSTRUMENTO de verificación LIVE post-merge:
  genero un prompt+esquema-de-observabilidad para la extensión "Claude in Chrome" del dueño (su sesión logueada;
  credenciales solo él, L-08), él lo ejecuta en la web en vivo y me pega la observabilidad → actúo (caza-bugs→fix).
  Cierra el hueco crónico "no puedo E2E en localhost, el dueño hace la verif final". Decisión de forma: **skill SIN
  workflow** (la ejecución vive en el navegador del dueño → un workflow sería sobre-ingeniería, L-50). [HONOR].
  Propagada ×4 repos + `~/.claude/skills/`. Conecta `caza-bugs`/`verification-before-completion`/`proceso-decision-fuerte` p7.

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
