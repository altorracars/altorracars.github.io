# 🧊 11 — PENDIENTES CONGELADOS (ledger de cars en PAUSA)

> **Hoja hija de `10`** (§G.5). Salió del nodo always-on el **2026-08-01**: por el **PIVOTE §302** este
> proyecto está EN PAUSA y sus 25 pendientes **no están cerrados, están congelados** — releerlos en cada
> arranque costaba **4.5k chars de contexto por sesión** para trabajo que nadie va a tomar hasta que el
> dueño reanude la línea cars.
>
> 📖 **Cuándo leer esta hoja**: cuando el dueño diga «volvemos a cars». Entonces vuelve a ser el ledger vivo
> y conviene devolverlo al `10` (el shard es reversible: fue por PAUSA, no por tamaño).
>
> ⚠️ **Ningún TODO de aquí está cerrado.** Cerrar uno exige su ADR en `99` + fila en `00`, como siempre.

---

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.
> ⏸️ **§302: TODOS los TODO de cars quedan EN PAUSA** (no cerrados) hasta que el dueño reanude la línea cars.
| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-52** | **🟣 EPIC #1 — CRM Overhaul ⟦OPUS⟧** — OLA 0-3 ✅ (§267-282); Directiva Permanente (brief `2026-06-29-crm-overhaul…`). Próximo=P0-CAPTURE. | ⏸️ (§302; era permanente) | orden dueño |
| **TODO-53** | **🔎 AUDITORÍA HOLÍSTICA ⟦OPUS⟧** — ✅✅ LIVE (§283-295; LCP 662ms). RESTA: barrido visual P4. | 🔄 | menor |
| **TODO-54** | **⚡ PageSpeed perf v2 ⟦OPUS⟧** — Ola 1 ✅ LIVE (§297-§298; cifras allá). RESTA: **Ola 2 reCAPTCHA/AppCheck (GATE Firebase Console)** · re-medir · unsized-images. 🚫 techo home = Cloudflare. | 🔄 | perf/gate-App-Check |
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto; re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS⟧** — CMS por marca ✅ (§222); resta CMS total. Skill `cms-dinamico`. | 🔮 | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-26** | **FACTURACIÓN + super-CRM ⟦OPUS⟧** (financiero/contable en panel; consultar Bersaglio). Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA | al final |
| **TODO-27** | **Alta usuarios = invite flow seguro ⟦OPUS⟧** (token+tx, anti-enumeración). Diseño→bóveda `2026-06-14-…cms-plan §6.4`. Skill portable. | 🔮 | tras dinamismo |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — range-shard ✅ (§258); `00a`/`32` shardeados ✅ 03/07; **00→00a ampliado a §1–§190 ✅ 10/07 (§299)**. Resta: 99a/99b · `ignoreDirs` · `33` over cap · `40-LOBULOS` ≥90% (pre-shard). | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS⟧** — gate IA (tests/invariantes en CI) + acceptance Kary en STAGING + dueño autoriza prod. Cars+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — §228+§229 ✅. RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ DORMIENTE (#917). FLIP=saldo. Bot v2→TODO-46. | 🔄 | dueño: saldo |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS⟧ (§244)** — 7 skills + agente `seo-auditor` ✅ (25/06). RESTA: Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
| **TODO-45** | **Cleanups §257 ⟦OPUS⟧** — functions residuales · `brands.saveBrand` desc · `kb.edit` editor · coment stale (detalle §257). | 🔮 | bajo |
| **TODO-43** | **MFA portal nuevo ⟦OPUS⟧ (§253)** — nuevo=email+pass only; SMS-MFA viejo (2FA/trusted/backup/TG) NO portado. Reimplementar TOTP+recovery si el dueño quiere. | 🔮 | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS⟧** — (a) freno boot-budget linter (M-10) **✅ HECHO** (`brain-check.mjs:271` `warn()` = bloqueante; boot 30040c ≤ 31500, §305 B-10); (b) gate drift source↔dist (AUD-04); (c) freno CI 05-stale **RE-ESCRITO en (d)**: su mitad «el 05 miente por la caché» se disolvió el 01/08 (el `05` dejó de declarar caché); (d) **el sidecar `docs/.estado-auto.md` no tiene gate de frescura** — nadie mide su `generado:` ni el desfase `main−dev` que él reporta (§305 C-03). | 🔮 | bajo |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS⟧** — §257+M-22 (check #16 ×4 ✅). Adopción `verificado-vivo:` **✅ en cars** (05, 27-ago). RESTA: **insema** (3 de 4 repos; su kernel v1.20 ya trae el chequeo — §305 C-02). Absorbe TODO-33. | 🔄 | insema |
| **TODO-46** | **Bot v2 flujo + chat vivo ⟦OPUS⟧** — B1/B2/B3 LIVE. RESTA: roundtrip chat + iter-2 (marca·FAQ·ARIA) → luego FLIP. **DUEÑO 09/07: v2 es NECESARIO pero DESPUÉS** (prioridad = velocidad). ⚠️ v1/v2 difieren por-dispositivo (flag `?altorbot=v2`) = NO bug; los reales van por v1. | 🔄 aparcado | tras velocidad |
| **TODO-48** | **Drift CRM del cutover ⟦OPUS⟧** — MF4.x admin viejo NO portadas (360°/KPIs/masivas/NPS) + doc-fixes. Bóveda `…barrido-drift…`. | 🔵 | tras bot |
| **TODO-50** | **Consigna = ENTIDAD FORMAL ⟦OPUS⟧** — ✅ live (L-57; §spec+`42`). RESTA humanos: colegiado/contador/purga ZZZ. | 🔄 | humanos |
| **TODO-51** | **Bloqueo fiscal — refinamientos ⟦OPUS⟧** — ciclo bloqueo→purga ✅ (`retentionUntil`+cron). RESTA (menor): grafo-comprador multi-rol + texto art.14 (`42`). | 🔵 | menor |
Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.
---
