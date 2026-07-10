---
name: sinapsis-cerebros
description: Usar ANTES de re-investigar un problema TRANSVERSAL (Firebase/Firestore/functions/rules, git/CI/CRLF, dinero/caja/CRM, rendimiento web, proceso de verificación) en cualquiera de los 4 proyectos del dueño (altorracars · bersagliojewelry · altorrainmobiliaria · insemastereo) — los 4 cerebros aprenden AISLADOS y ya re-descubrieron la misma lección ≥6 veces. Enruta un grep a las lecciones de los cerebros HERMANOS en el mismo disco. También al PROPAGAR una lección portable entre cerebros (protocolo anti copy-ciego). Triggers — "este síntoma me suena pero no está en mis lecciones", "gotcha de Firebase/git/dinero", "¿otro proyecto ya vivió esto?", "propaga esta lección a los otros cerebros".
---

# 🧠🔗 Sinapsis cross-cerebros — consulta a los hermanos antes de re-aprender

> Nace de la mega-auditoría cross-cerebros 2026-07-10 (cars ADR §300, mandato del dueño):
> ≥6 lecciones fueron re-descubiertas de forma independiente porque cada cerebro aprende
> aislado — screenshot-headless-se-cuelga ×3 (cars L-28 · bersaglio L-05/L-09 · insema L-04),
> tablero-05-fija-hechos-stale ×2 (cars M-22 · bersaglio M-08), ADC/multicuenta ×2 (cars
> L-43 · bersaglio L-23/L-33), verificar-tras-subagente ×2 (cars W-04 · bersaglio L-27),
> dinero-se-verifica-adversarial ×2 (bersaglio L-39 · cars M-23). Re-aprender lo ya pagado
> es el desperdicio que esta skill elimina.

## 1. Mapa de los 4 cerebros (mismo disco, rutas hermanas)

| Cerebro | Repo en `C:\Users\romad\Documents\GitHub\` | Lecciones | Fuerte en |
|---|---|---|---|
| **cars** (canon) | `altorracars.github.io` | `docs/30-LECCIONES.md` + hijas `31` (git) · `32` (meta M-NN) · `33` (frontend) | SSG/cron/SW · CRM Firestore · workflows/subagentes · a11y/perf · meta-gobernanza del cerebro |
| **bersaglio** | `bersagliojewelry.github.io` | `docs/30-LECCIONES.md` + `31-…FIRESTORE` · `32-…CARGA` · `34-…META` | **DINERO** (POS/caja/pasarela Wompi/arqueos/idempotencia) · rules adversariales · functions gen2 · LCP/carga CMS |
| **inmobiliaria** | `altorrainmobiliaria.github.io` | `docs/30-LECCIONES.md` (joven: 7) | arranque Firebase/presence |
| **insema** | `insemastereo.github.io` | `docs/30-LECCIONES.md` (joven: 7) | sitio estático user-site / GitHub Pages |

## 2. Cómo consultar (barato — 2 pasos, en el hilo PRINCIPAL)

1. **Títulos**: `Select-String -Path ..\<repo>\docs\*LECCIONES*.md -Pattern '^### '` (o `Grep`/`rg` con ruta absoluta).
2. Lee **SOLO el tramo** de la lección que suena (offset/limit o `-Context`) — jamás el archivo entero del hermano.

⚠️ Hazlo TÚ directamente: un SUBAGENTE en background con lecturas fuera-de-cwd **SE CUELGA**
esperando un permiso que nadie aprueba (cars L-50). Shell en foreground funciona.

## 3. Reglas de citación y propagación (anti-daño)

1. **Cita SIEMPRE con prefijo de repo** ("bersaglio §115", "cars M-20"). Un `L-NN` pelado en
   TU cerebro o resuelve a TU lección homónima (mentira silenciosa: cars y bersaglio tienen
   L-65 DISTINTAS) o dispara refs colgantes en el linter (check #5b del kernel).
2. **Propagar ≠ copiar**: re-escribe en la CONVENCIÓN del destino, verificada leyendo su `30`
   (formato de headers, numeración, shards) — cars L-52: un copy byte-idéntico que no aplica
   = no-op silencioso = falsa cobertura.
3. **MÉTODO portable → skill global** (`~/.claude/skills/`), NO 4 copias en 4 cerebros (SSoT;
   así viajaron `caza-bugs`, `auditoria-financiera`, `comite-expertos`, `optimizacion-rendimiento-web`).
4. **Escribir en un repo hermano** exige: su `git status` limpio (hazard multi-chat, cars L-48) +
   respetar SU política de ramas (bersaglio = el dueño mergea a main por PR · cars = Claude
   mergea `dev`→`main`) + su `brain:check` en verde después. Ante la duda, deja la importación
   listada abajo y que la ejecute la próxima sesión de ESE repo.

## 4. Importaciones pendientes por cerebro (auditoría 2026-07-10 — cada operador ejecuta la suya y actualiza esta lista)

- **cars**: ✅ ronda 1 (su L-74: callable-403=invoker bersaglio §115 · secrets gen2 ≠ deploy `.env` ·
  MCP `firestore_query_collection` timestamp→`[]` falso · render-sugiere-click-revalida bersaglio §76).
  ✅ **ronda 2 (2026-07-10, cars ADR §301)** — con TRIAGE: bersaglio §181→ya era su L-73 (sin acción) ·
  §182 IA-panel→`43-UX §Doctrina-panel` (ADOPTÓ es-CO-sin-jerga/cero-PRONTO/microcopy-dinero/KPI
  abreviado+exacta/anular-ventana-viva; 3 reglas ya cumplidas por su §268/§246) · §183 minería→su L-75
  (twenty NETO = T-2 arrays tel/email + T-24/T-25 widgets/actor-`fuente`; DESCARTÓ re-importar
  T-1/T-5/T-18/T-19/T-27 = ya cubiertos por su CRM; callejones registrados) · paid-media→
  `meta-ads-diagnostico §Doctrinas minadas` (actualizó el GLOBAL + su espejo; ojo bersaglio: tu copia
  repo quedó con redacción propia — si quieres converger, re-sincroniza desde el global) · skills
  `opus-interino-protocolo` (+flag en su 05) y `pos-facturacion-retail` catalogadas · n8n = Decisión
  Fuerte propia futura, NO adoptado.
- **bersaglio**: de cars → M-20 (un hit de grep prueba PRESENCIA, no semántica — leer el match
  antes de construir encima) · M-24 (no construir maquinaria nueva compleja si hay solución
  simple a la mano) · L-71 de cars (commit en HEAD desprendido queda COLGANTE; verificar
  `git rev-parse --abbrev-ref HEAD` antes de commitear tras un resume).
- **inmobiliaria** (mayor ganancia — mismo stack Firebase): de cars → L-26 (upsert de ingestión:
  `merge:true` pisa first-seen; mark de idempotencia DENTRO de la transacción) · L-47/L-64
  (rules: leer campo AUSENTE de `resource.data` LANZA, no es null → `('x' in …)`/`.get()`) ·
  L-39 (un GET público linkeado por WhatsApp/email JAMÁS muta — los previews lo disparan solos) ·
  L-40 (`merge:true` no borra claves de mapas; liberar recursos compartidos exige verificar
  PROPIEDAD). De bersaglio → §115 (callable 403 = invoker; delete+recreate) · secrets gen2 ≠
  deploy `.env` · §66 ("desactivar" = deshabilitar la cuenta de AUTH, un campo en un doc NO es
  credencial) · §181 (método forense del dinero, cuando maneje plata → skill `auditoria-financiera`).
- **insema**: bajo valor hoy (sitio estático sin Firebase ni dinero); su doctrina §3.3 ya cubre
  la esencia de proceso. Revisar si el stack crece.

## 5. Qué NO es esta skill

- NO reemplaza las lecciones locales — lo repo-específico se queda en su cerebro.
- NO es excusa para leer 4 cerebros enteros "por si acaso": grep de títulos + tramo puntual.
- La alineación de GOBERNANZA (§G ×4, TODO-28 de cars) es del escritor único del kernel
  (operador-cars), no de esta skill.
