# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): footer `Modelo: Opus 4.8` + tag `⟦OPUS-4.8 · rev-Fable⟧` (detalle → `05`).

> 🧠 **Cerebro v6 ✅** (3 cerebros N2) · hardening A/B/C = **TODO-28/29/30** (§208, diseño-listo, NO urgente).

> 🏗️ **CRM E0→E6 ✅ (§176/TODO-21)** en `main`. Vender=Pipeline · dealers F2 FROZEN. **RBAC ④a COMPLETO ✅ (§219)**; **④b PARQUEADO** (al retomar = FLOOR server-side antes de enforce `nivel`).
>
> 🏗️ **CMS por marca COMPLETO ✅ (§220-§225, LIVE) ⟦OPUS-4.8⟧** — incl. §225 cron→admin+SA **ACTIVADO** (SA `cron-ssg-lector` + secret, verificado en vivo) + auditor SVG (0.2b cerrado, 0 SVG). Detalle→§225/§226. **TODO-23 (CMS total: index/nosotros/contacto/columnas+bloques) continúa.**
> ⚠️ Decisiones dueño pre-cutover → §193. Gates: F32 móvil · F33b piloto · manual.
> 🚫 **Callejones de trabajo CERRADO** → §204/§188/§187.
> Strangler/cutover → §188+§183. Gates heredados: App Check enforce ~16-23/06 (→`41`) · SEC-05/07/09 (diferidos).
> ⏳ **Cliente** (→`05` flags): descartar lead prueba `VMVMJG…` · anunciar F42 · billing GCP causa raíz.
> ⚖️ **Gate P4 vigente**: el TEXTO legal público de supresión/privacidad NO se publica sin abogado.
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini-vía-Antigravity **code-aware solo-lectura** (§224 corrigió "no ve código"); triggers + refinamientos R1-R4 en `§15`; usar en seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar docs de config de producción vía MCP** — el clasificador lo deniega; ruta correcta:
> dejarlo como acción de 1 clic del dueño en el portal (patrón F39) o pedir autorización explícita.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos: Cloudflare+Vite · critical CSS · cartagena SEO · CSAT+transferencias · deuda técnica menor · skills anomalías · blindaje→E5 (§176). **Detalle §109** + `41`/`42` | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6 21/21** (A-U) — detalle §173/§207.11; follow-up cross-repo → TODO-28/29/30 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (frontend/backend/framework; arranque + **RESCATE de webs monolíticas**, ampliado 12/06) §193.2 | 🔮 | post-panel (orden ratificado) |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — todas las secciones editables (index/nosotros/contacto/columnas + bloques tipados; SSG extendido). **CMS por marca COMPLETO ✅ (§222)**; resta el CMS total. Plan→bóveda `2026-06-14-web-dinamismo-cms-plan.md` · skill `cms-dinamico`. Bugs: demo-cuando-vacío, lentitud SPA-feel. | 🔮 plan ✅ | "al final" |
| **TODO-24** | **Comité BORRADORES** (rediseño profesional) §202.5 → **f1+2 ✅ LIVE (§227, #896)**: recuperación local opt-in §107-safe + por-cuenta + galería pro + modal custom (comité ACOTADO 4+peer-review). **f3 PENDIENTE** = Storage huérfanos+TTL (`drafts/{uid}/` prefix + copy-on-publish) = **Decisión Fuerte → Gemini** 🛰️ + GC huérfanos históricos | 🔄 f1+2 done · f3 gated | f3: Gemini |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — comité×3 + Gemini Pro High + dueño → **DISEÑO FROZEN** (bóveda `…restructura-comercial…` sec.9: tenancy+economics ortogonal · snapshot array versionado · onWrite espejo · F42 profitOf). Implementa al FINAL | 🔄 decidido·impl pend | al FINAL · 🔥 parche legal JSON-LD ✅ interim §205 · pendiente menor: confirmar aliado-neto-constante + fórmula fiscal (contador) |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable/comercial en panel admin) — consultar cerebro+repo **Bersaglio** AL implementar. Detalle bóveda `2026-06-13-restructura-comercial-…` §8 | 🔒 **ÚLTIMA fase** | después de TODO lo documentado/planeado HOY (E6 cutover + TODO-21..25 + redesign) |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-28** | **Split §G / des-saturación (§206/§208.1) ⟦OPUS-4.8⟧** — A0/A5/A6/A7/A9 ✅; diseño **Núcleo Delimitado** byte-hasheado ×3. **Absorbido por TODO-32** (el §G se vuelve genoma machine-checkable). | 🔄 | vía TODO-32 |
| **TODO-29** | **Endurecer el lazo (§207/§208.2) ⟦OPUS-4.8⟧** — git-gates → **abolir estado-git en `05`**: SessionStart hook inyecta git-state en boot. Kernel/hook ×3. (Aún: shard 99a/99b · `ignoreDirs`.) | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD del cerebro ⟦OPUS-4.8⟧** (comité+Gemini+debate; diseño→bóveda `…TODO32-…SINTESIS.md`). **HECHO cars-ONLY**: `scripts/brain-index.mjs` = guardián que AUTO-RECONCILIA las líneas del índice vivo (auto-cura el drift que cualquier inserción en `99` provoca; cura §227) + valida tombstones; índice NO se comprime (§228: tope `00` 36k→48k, ratchet §173); tombstoning anti-Data-Rot (`⛔ REEMPLAZADO POR §M`, 1er caso §111→§112). **⚠️ NO REPLICADO a bersaglio/inmob/insema** (kernel intacto byte-idéntico ×4). **Resta (SESIÓN FRESCA, gate dueño) = paso (b)**: replicar ×4 cerebros (`brain-index.mjs` + doctrina §228 + convención tombstone; decidir si promover el guardián al kernel `brain-check.mjs`) · genoma frontmatter (índice lossless de descripciones, **YAGNI ahora**) · tiering (100x). | 🔄 cars ✅ · replicar ×brains PEND | sesión fresca paso (b) |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> GC ×13 (12-20/06): §184-§222 consolidados (→`99`/`00`/`30`/`33`).
> - **21/06**: §223 Caza-bugs ×4 · §224 Consejo Externo (Tier R1-R4) · §225 CMS cron+SA + auditor SVG (L-49) · §226 auditoría N2 SANO (sondas colgaron→'comité acotado') · **TODO-31 ✅** (skill `comité-expertos` §ACOTADO ×5; §226.8). Pendiente cliente: 2 Secret-Scanning cerradas + App Check enforce DIFERIDO (§41). Detalle→§223-226/bóveda.
> - **22/06**: **TODO-24 borradores f1+2 → ✅ LIVE** (§227, merge #896). Comité ACOTADO (4 exp + peer-review, foreground/sin-tools → NO se colgó = L-50 en acción) → interpretación (a) "el RESULTADO, no el mecanismo §107": red de recuperación local **opt-in** (localStorage scoped por uid) + galería pro + modal custom + guard anti-resurrección. Build+smoke-mock ✓; dueño verificó+mergeó. **f3 Storage huérfanos/TTL = Gemini-gated**. L-51/M-17. Cache: el cron la bumpeó (ver `05`, L-02). CRUDO→bóveda.
