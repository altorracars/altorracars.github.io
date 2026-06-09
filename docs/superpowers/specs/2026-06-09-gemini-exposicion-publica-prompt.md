# 🛰️ Prompt para Gemini (Antigravity) — Decisión: exposición pública de los cerebros (comité v6, ítem C)

> **Cómo usarlo**: el cliente abre Antigravity (Gemini 3.1 Pro, modo High), le da acceso a los 3 repos
> locales (`C:\Users\romad\Documents\GitHub\`) y pega el prompt de abajo. La respuesta se trae a la
> sesión de Claude para integrarla (protocolo `docs/15-CONSEJO-EXTERNO.md`: adoptar/refutar con razón).

---

Actúa como auditor adversarial de seguridad de la información (red team). NO me des la razón por defecto;
tu trabajo es encontrar los fallos de mi análisis.

**Contexto**: tengo 3 sitios estáticos en GitHub Pages (repos PÚBLICOS, plan free):
`altorracars.github.io` (concesionario), `altorrainmobiliaria.github.io` (inmobiliaria),
`bersagliojewelry.github.io` (joyería). Cada repo contiene, además del sitio, un "cerebro documental"
en `docs/` que mi asistente de IA usa como memoria entre sesiones. Problema detectado: ese cerebro
incluye material sensible servido como URLs públicas indexables:

- `docs/41-SEGURIDAD.md` (cars): auditoría de seguridad con hallazgos archivo:línea de las reglas de
  Firebase (algunos YA mitigados, otros PENDIENTES — p. ej. RBAC-read laxo, validación de payload ausente).
- `docs/superpowers/research-archive/` (cars, ~1.5MB): deliberaciones crudas de comités de IA sobre
  arquitectura, seguridad y negocio.
- `docs/crm-handoff.md` + specs: planes internos del CRM, modelo de datos, decisiones de negocio.
- Equivalentes menores en los otros 2 repos (bersaglio tiene `41-SEGURIDAD` y plan de hardening F6).

**Restricciones duras**: (1) GitHub Pages free exige repo público — privatizar el repo mata el hosting
del sitio productivo; (2) presupuesto ~$0 (no hay dominio/CDN de pago aún; migración a Cloudflare Pages
está bloqueada por ~$10/año); (3) el cerebro DEBE seguir versionado en git y accesible para el asistente
local (vive en el working tree); (4) el flujo de auditorías va a CRECER: cada auditoría futura produce
hallazgos nuevos con file:line.

**Opciones sobre la mesa** (critícalas y propón mejores):
- (a) Triage/redacción: mantener los docs públicos pero reescribir el detalle explotable (quitar file:line
  de hallazgos ABIERTOS; mantener los cerrados como histórico).
- (b) Repo privado hermano (`brain-private`) para lo sensible (41-SEGURIDAD con hallazgos abiertos,
  research-archive, planes) + punteros desde el cerebro público; el asistente lo clona localmente.
- (c) Aceptación documentada: evaluar que el contenido NO es realmente explotable (las reglas de Firebase
  son visibles de todos modos vía las requests del cliente; "security through obscurity" no protege) y
  firmar un ADR de aceptación de riesgo.
- (d) Híbridos / alternativas que yo no haya visto (p. ej. `.gitignore` + carpeta local no versionada con
  backup propio; o submódulo privado).

**Preguntas concretas**:
1. ¿Cuál es el daño REAL marginal de publicar hallazgos de seguridad sobre reglas Firebase que un atacante
   igual puede sondear dinámicamente? ¿Dónde está la línea entre "mapa útil para el atacante" y "obscuridad inútil"?
2. ¿La opción (b) rompe la invariante "cero pérdida + git-versionado" si la máquina del cliente muere?
   ¿Cómo la endurecerías?
3. ¿Qué contenido de los listados clasificarías como RED (mover/redactar YA), AMBER (redactar al cerrar),
   GREEN (público sin problema)? Da el criterio, no solo la lista.
4. ¿Riesgos de segundo orden que no estoy viendo? (scrapers de LLM entrenando con los planes de negocio,
   indexación de PII en deliberaciones, etc.)
5. Recomendación final ÚNICA con su trade-off principal y el primer paso ejecutable hoy a costo $0.
