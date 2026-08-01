# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> **⏸️ PIVOTE 10/07 (dueño, ADR §302): CARS EN PAUSA — prioridad #1 = ALTORRA INMOBILIARIA**, que **YA LIDERA el cerebro ×4** (traspaso ejecutado 18/07; su chat ACTIVO, ADRs §33+ en su 99; el kernel se consume de su canónico). Kickoff (SSoT) = **`specs/2026-07-10-INMOBILIARIA-KICKOFF-fable5.md`**. Este cerebro = modo mantenimiento (resonancia §303).
>
> **REANUDAR CARS (solo cuando el dueño lo diga)**: ⭐(A) fotos de vehículos = win móvil REAL (Firebase Storage 2.5-4.4MB; lazy agresivo + srcset) · (B) Ola 2 reCAPTCHA — GATE: App Check MONITOR confirmado en Firebase Console (§41) · (C) TODO-52 CRM (leer `43-UX §Doctrina-panel` primero). Perf → §297/§298; gates dueño → §283-298. **Auditoría-de-Opus OFRECIDA sigue en pie (§300)**. Cache: SWR sin bump (L-65).
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones (NO reintentar; detalle en el §/L citado)**:
> (a) NO custom claims aún (Fase 1=lookup `usuarios/{uid}`; §159.3). (b) NO `preview_screenshot` (cuelga tras resize L-28)→`snapshot`+`eval`. (c) Consejo Externo=Gemini code-aware **solo-lectura** (§224/§15), no rutina. (d) NO E2E forms localhost (L-08/§175)→solo live+stub `window.db`. (e) NO mutar config prod vía MCP→acción 1-clic dueño (F39). (f) Fan-out acotado escala libre si in-cwd read-only+structured-output sin tools gateadas (git cuelga bg→worktree/fg) L-50/§226.
> (g) Bot v2=grafo tras flag (v1 INTACTO; NO big-bang/Vite; `js/concierge/shared/` NO copiar) §F-1. (h) Auditoría=CÓDIGO≠DEPLOY→"LIVE" se chequea live (Firebase MCP), verificadores SIN Bash L-50. (i) Val. live SIN screenshot=cobertura fingida (M-23)→screenshot del render (ext. `computer`). (j) `confirm()` nativo BLOQUEA la ext. Chrome→yo lleno/verifico-Firestore, dueño Acepta; tab atascado→`tabs_create_mcp`. (k) Workflow read-only puede colgar 1 agente→bloquea `parallel()`; cosechar `journal.jsonl`+`TaskStop` (L-61). (l) Audit que clasifica código=FALSOS POSITIVOS→verificar con grep real (L-62). (m) PDFs PageSpeed = IMÁGENES → render PDF→PNG vía `Windows.Data.Pdf` (`scratchpad/render-pdf.ps1`; poppler=solo pdftotext); leer TODAS las páginas. (n) pagespeed.web.dev ~90s + screenshot puede colgar→reintentar single. (o) minify-manual + critical-CSS-inline público = DESCARTADOS (footgun/FOUC; comité).

---

## 📋 Pendientes — 🧊 CONGELADOS (§302)

> Los **25 TODO de cars están EN PAUSA, no cerrados** → 🧩 **`docs/11-PENDIENTES-CONGELADOS.md`**.
> Salieron del boot el 01/08: costaban 4.5k de contexto en CADA sesión para trabajo que nadie va a tomar
> hasta que el dueño reanude cars. **Al reanudar, vuelven aquí** (el shard fue por PAUSA, no por tamaño).
> Lo único que sigue vivo en el boot es el **Foco** de arriba (caminos A/B/C) y sus **🚫 callejones**.

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.

- **23/07 · 18/07 · 10/07 ⟦FABLE-5⟧** — mantenimiento §303 · sinapsis desde inmobiliaria (escritor único de §G/kernel → inmob.) · sinapsis ×4 y PIVOTE §302. Detalle → §299-§303 y skill `sinapsis-cerebros §4`.
- **01/08 ⟦OPUS-5⟧** — heartbeat instalado: el `05` deja de declarar caché y rama (las genera `docs/.estado-auto.md`) → mata la reincidencia de L-02. Kernel v1.7.2. Detalle → inmobiliaria §72-§77.
- **Pendientes perf/voz** (§283-297): voz bot `js/ai`+legacy `js/admin` (⚠️ `intent.js` NO tocar); 🚫 NO quitar Poppins/`admin-calendar-config`.