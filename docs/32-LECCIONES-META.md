# 🪞 32 — LECCIONES · Meta: autocrítica del cerebro (hija de `30-LECCIONES.md`)

> **Shard de `30` (§G.5, 2026-07-03).** Detalle de los **M-NN** (fallos del propio cerebro /
> Reflejo de Autocrítica `CLAUDE.md §G.4`). En `30` quedan los **stubs `### M-NN`** (título + puntero);
> aquí vive el detalle. Neurona **on-demand**: se lee al hacer post-mortem o cuando un M-NN "suena a visto".

## 🪞 Meta: fallos del propio cerebro (detalle)

### M-01 · Una neurona stale me habría engañado (Memoria Espacial)
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:M-01]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-02 · Un chequeo del cerebro dio falso negativo (casi asumo mal)
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:M-02]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-03 · El cerebro no se auto-alimentaba sin recordatorio explícito
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:M-03]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación)
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:M-04]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales
⇒ **Migrada al maestro** (F2 lote 8): [[CARS:M-05]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-06]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92%
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-07]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-08 · Evaluar propuestas de "mejora del cerebro" con evidencia, no con entusiasmo (§151)
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-08]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-09 · La Autocrítica debe vigilar la COBERTURA de los reflejos, no solo los errores de ejecución (§152)
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-09]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-10 · Lo verificable va al LINTER que FALLA, no a un reflejo que debo recordar (§153)
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-10]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-11 · "Verifica, no asumas" es UNIVERSAL, no solo RCA de código (recidiva 2026-06-03)
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-11]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-12 · Claude hace TODO el git (commit + push + MERGE dev→main) — el dueño NO toca git (drift RECURRENTE 19/06·27/06·29/06)
- **Defecto**: le devolví el git al dueño. 19/06 *"los commit/push los haces TÚ"*; 27/06 delegó TAMBIÉN el merge (*"commit + push + merge para que sea más rápido"*); 29/06 RECIDIVA: volví a dejarle el merge → me corrigió, preocupado por la pérdida de memoria. **Causa raíz = META (M-25)**: el hecho vivía en registros que se CONTRADECÍAN (`single_branch`+`MEMORY.md` decían "dueño mergea"; `auto_deploy`+`CLAUDE.md §2`+`05` decían "Claude mergea") → leo el índice de memorias primero → seguí el viejo.
- **Corrección definitiva (29/06)**: Claude hace el pipeline completo `commit+push` + merge `git checkout main && git merge dev && git push origin main && git checkout dev`. El dueño **NO toca git, NUNCA**; si un push a main se bloquea, busco otra vía. Alineé los 6 registros.
- **Principio**: el dueño da VISIÓN y DECIDE (dinero/legal); **NO opera git ni delibera código**. [HONOR]

### M-13 · Una "cura" se verifica en la capa que el BOOT lee, con grep — no se declara en el historial (recidiva RECURSIVA 2026-06-09)
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-13]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-14 · "Sesión fresca" de un plan es heurística de PRESUPUESTO, no gate — el corte lo decide el dueño con números reales
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-14]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-15 · Medir el costo de contexto del cerebro = `.length` de JS sobre los bytes crudos, NO `wc -m` ni "líneas × N" ⟦OPUS-4.8 · rev-Fable⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-15]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-16 · El lazo de auto-corrección funciona cuando MECANIZA (gate); es teatro cuando deja el fix en doctrina — la cura de una REINCIDENCIA es un gate, no un reflejo ⟦OPUS-4.8 · rev-Fable⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-16]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-17 · Cuando el pedido LITERAL del dueño contradice el historial verificado, NO construyas a ciegas — interpreta por evidencia (el RESULTADO, no el mecanismo) y prefiere opt-in sobre imponer ⟦OPUS-4.8 · rev-Fable⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-17]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-18 · Un `firebase deploy` JAMÁS es paso del dueño — los deploys los ejecuto YO (§1); el dueño solo DECIDE ⟦OPUS-4.8⟧
- **Defecto (2026-06-23)**: en el runbook de go-live del EPIC puse `firebase deploy --only functions` como paso numerado **del dueño**. §1 dice explícito "los deploys los ejecuta Claude" — la regla estaba CARGADA (CLAUDE.md auto-load cada sesión) y aun así no la apliqué. El dueño: "esto lo ajustamos hace tiempo y aún fallas".
- **Causa**: confundí "la DECISIÓN de ir-live es del dueño" (dinero/producción, cierto) con "el ACTO de desplegar es del dueño" (FALSO). Familia **M-12** (yo commiteo+pusheo, el dueño solo mergea en web): misma frontera **dueño-DECIDE / Claude-EJECUTA**, ahora trasladada al deploy. Bajo contexto largo una regla always-on no disparó al redactar pasos.
- **Corrección (trigger duro)**: antes de escribir CUALQUIER "pasos/runbook para el dueño", escanear cada paso → si es `firebase deploy` / desplegar / publicar functions·rules = **es MÍO, lo ejecuto yo**. El dueño SOLO: merge `dev`→`main` en web (M-12) · go/no-go · dinero · A/B · gates legales (P4). Config-docs de prod (`_brain.enabled`, `config/altorTTL.enabled`, etc.) = dueño-en-portal o yo-con-su-go, NUNCA vía MCP (callejón e). + §1 endurecido este turno.

### M-19 · No construyas lo NUEVO encima de lo VIEJO roto sin limpiarlo — TODO-35 deferido ×N → el código viejo rompió EN VIVO ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-19]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-20 · Un HIT de grep/search prueba que el patrón está PRESENTE, no QUÉ HACE el código — leer la semántica del match antes de construir encima ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-20]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-21 · "Validado E2E" del HAPPY-PATH no es validado — un paso que se porta RARO en la validación es señal de bug (no nuisance); entidad con CICLO DE VIDA → frontera obligatoria = cerrar/finalizar/reabrir + REPETIR la acción + ambos lados ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-21]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-22 · El cerebro documenta ESTRUCTURA pero no verifica REALIDAD — "✅" conflaciona DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE (auditoría §257) ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-22]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-23 · Mi validación verifica que FUNCIONE, no que se VEA BIEN — Chrome(DOM) + caza-bugs cazaron CERO defectos de diseño; el dueño los cazó TODOS a ojo ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-23]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-24 · Construí maquinaria NUEVA compleja cuando ya existía una solución simple A LA MANO — el dueño: "tienes las cosas visibles a la mano e hiciste algo mas complejo" ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-24]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

### M-25 · El cerebro PIERDE MEMORIA cuando el MISMO hecho vive en registros que se CONTRADICEN ⟦OPUS-4.8⟧
⇒ **Migrada al maestro** (F2 lote 9): [[CARS:M-25]] · cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo).

