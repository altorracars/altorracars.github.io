export const meta = {
  name: 'adversarial-review',
  description: 'Reusable multi-dimension adversarial review of a change before deploy (find → triage). Pass args.',
  whenToUse: 'Before merging/deploying any non-trivial change. args = { scope, files?, dimensions? }.',
  phases: [{ title: 'Review', detail: 'one reviewer per dimension, in parallel' }],
}

// ── Parámetros (vía args) ───────────────────────────────────────────────
// args.scope      : string — qué cambió (resumen + rutas). OBLIGATORIO en la práctica.
// args.files      : string[] — rutas a leer (opcional; el reviewer las lee).
// args.context    : string — restricciones/doctrinas del proyecto a respetar (opcional).
// args.dimensions : [{key,prompt}] — override del set por defecto (opcional).
const A = (typeof args === 'object' && args) ? args : {}
const SCOPE = A.scope || 'el cambio actual (sin descripción — el reviewer infiere del diff/los archivos)'
const FILES = Array.isArray(A.files) ? A.files : []
const CONTEXT = A.context || `Altorra: vanilla JS + Firebase, $0, modular (no monolito). Doctrinas: verifica-no-asumas (§3.3), IAP (§37), lente de arquitecto (§3.8), tokens HarmonyOS sin hex, el() solo 'text' con datos (anti-XSS), cleanup de listeners, mock-first, índices de campo único (L-30), sin cache bump si solo toca admin-app/ (L-27).`

const DEFAULT_DIMS = [
  { key: 'correctness', prompt: 'Caza BUGS de correctness/lógica: aritmética, condiciones límite, división por cero, NaN/null, off-by-one, estados imposibles. Verifica con un ejemplo concreto.' },
  { key: 'regression-pattern', prompt: 'Caza REGRESIONES y rupturas de patrón: contrato del módulo (mount/cleanup), fugas de listeners, IDs/exports renombrados que rompan otros módulos, render-tras-desmontar, store mutado mal, divergencia del patrón establecido.' },
  { key: 'security-data', prompt: 'Caza problemas de SEGURIDAD/datos: XSS (innerHTML con datos), reglas/permguardas faltantes, PII expuesta, queries que necesiten índice compuesto no desplegado, manejo de permission-denied, secretos en cliente, validación de entrada.' },
  { key: 'a11y-ux', prompt: 'Caza fallos de A11Y/UX: foco visible, roles/aria, semántica de tablas, estados loading/error/empty, falso-affordance, reduced-motion, contraste, responsive, scroll de contenedores.' },
]

const SCHEMA = {
  type: 'object', additionalProperties: false, required: ['findings', 'verdict'],
  properties: {
    verdict: { type: 'string', description: 'ship / ship-with-fixes / block + una línea de porqué' },
    findings: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['severity', 'file', 'location', 'issue', 'fix', 'confidence'],
        properties: {
          severity: { type: 'string', enum: ['high', 'med', 'low'] },
          file: { type: 'string' }, location: { type: 'string' },
          issue: { type: 'string' }, fix: { type: 'string' },
          confidence: { type: 'string', enum: ['high', 'med', 'low'] },
        },
      },
    },
  },
}

const dims = Array.isArray(A.dimensions) && A.dimensions.length ? A.dimensions : DEFAULT_DIMS
const filesBlock = FILES.length ? `\nArchivos a leer COMPLETOS:\n- ${FILES.join('\n- ')}` : '\n(Lee los archivos cambiados relevantes al scope.)'

phase('Review')

const results = await parallel(dims.map((d) => () => agent(
  `Revisión adversarial — dimensión "${d.key}".\nCONTEXTO/DOCTRINAS: ${CONTEXT}\nSCOPE: ${SCOPE}${filesBlock}\n\nTU FOCO: ${d.prompt}\n\nReporta SOLO defectos REALES con ubicación + fix concreto. NO nits de estilo. Si dudas, marca confidence:low. Da un verdict global de la dimensión.`,
  { label: `review:${d.key}`, phase: 'Review', schema: SCHEMA, agentType: 'Explore' }
)))

// Consolidado: el orquestador (Claude) triará contra el código real para descartar
// falsos positivos (meta-lección: los reviewers marcan "high" que al leer el código no lo son).
const flat = results.filter(Boolean).flatMap((r, i) => (r.findings || []).map((f) => ({ ...f, dimension: dims[i].key })))
const high = flat.filter((f) => f.severity === 'high')
return {
  scope: SCOPE,
  verdicts: results.filter(Boolean).map((r, i) => ({ dimension: dims[i].key, verdict: r.verdict })),
  counts: { total: flat.length, high: high.length },
  findings: flat,
  reminder: 'TRIAR cada finding contra el código real antes de aplicar (verifica-no-asumas §3.3): muchos "high" son falsos positivos.',
}
