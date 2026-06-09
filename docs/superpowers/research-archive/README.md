# 📦 research-archive — Investigación CRUDA del cerebro multi-proyecto (ADR §170 → §171)

> Salidas COMPLETAS (sin sintetizar) de los workflows multi-agente de la sesión 2026-06-09. Se preservan aquí
> porque vivían en archivos temporales que el sistema borra. **NO leer enteros** (son grandes, JSON) — son el
> respaldo del "todo lo que se investigó". Las CONCLUSIONES accionables ya están en los specs hermanos (síntesis).
>
> Para consultar un detalle: abrir por offset / grep, como el `99-HISTORIAL`.

| Archivo | KB | Qué es | Síntesis durable en |
|---|---|---|---|
| `2026-06-09-comite-mejora-deliberacion-completa.json` | 510 | **Comité ×3 completo** (Mandato 2): 34 agentes, 3 rondas (exactitud/profundidad/acción), cada crítica de los 5 expertos + peer-reviews anónimos + síntesis del presidente por ronda + prompt Gemini | `2026-06-09-plan-mejora-cerebro-v4-comite.md` (plan v5 + deltas) |
| `2026-06-09-inventario-workflow-crudo.json` | 108 | **Inventario completo** (Mandato 1): catálogo artefacto-por-artefacto de los 3 cerebros + capa skills (5 agentes) con criticalInfo/fourLayer/preservation/risk por archivo | `2026-06-09-inventario-preservacion-cerebros.md` |
| `2026-06-09-extraccion-monolitos-inmobiliaria.json` | 85 | **Extracción** (PASO 2): 16 semillas por-nodo destiladas de los 8 monolitos de inmobiliaria (6 agentes) | autorado en `altorrainmobiliaria/docs/*` + originales en su `_legacy/` |
| `2026-06-09-comite-revalidacion-paso1-deliberacion.json` | 494 | **Comité ×3 de revalidación PRE-PASO-1** (33 agentes): revalidó el plan v5 → **ADR §171** (pausar el sync P2P del KERNEL); cada crítica + peer-review anónimo + presidente, 3 rondas (exactitud/profundidad/acción). | `2026-06-09-comite-revalidacion-paso1-VEREDICTO.md` + ADR §171 |
| `2026-06-09-mandato3-validacion-final-deliberacion.json` | 75 | **Comité de Validación FINAL (Mandato 3)** (11 agentes): certificó en disco cero-pérdida / aislamiento / lectura fluida; veredicto NO_CERTIFICA → 2 bloqueantes (cura no aterrizada en §G.4 + este README stale) → resueltos. | acta de cierre en ADR §172 |

> ⚠️ Estos JSON son el registro de PROCESO, no la fuente de verdad operativa. Para retomar el trabajo, usar los
> specs de síntesis + el `HANDOFF-ESTADO.md`. Esto es para auditoría / "no perder nada de lo investigado".
