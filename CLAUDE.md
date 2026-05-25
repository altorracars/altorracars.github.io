# CLAUDE.md — Altorra Cars · 🧠 Tronco Encefálico (Router Neuronal)

> **Este archivo se auto-carga en CADA sesión.** Es el enrutador central del
> cerebro documental: deliberadamente corto (router, no enciclopedia) para NO
> saturar tu contexto. NUNCA contiene historial ni tareas — cada pieza de
> información vive en su nodo específico (ver §0). El detalle se lee on-demand.
>
> Última reestructuración: 2026-05-25 (ADR §118 — arquitectura neuronal de memoria).
> **Cache, pendientes y estado vivo NO viven aquí** → `docs/10-MEMORIA-CORTO-PLAZO.md`.

---

## §0 — Mapa de nodos de memoria (índice de enrutamiento)

El cerebro está dividido en **nodos**. Tú auto-cargas SOLO este `CLAUDE.md` +
el nodo de Corto Plazo (ver Directiva de Ignorancia Selectiva, §G). El resto
se lee on-demand cuando un trigger lo exige. Así no quemas contexto.

| Nodo neuronal | Archivo | Auto-carga | Cuándo leerlo |
|---|---|---|---|
| 🧠 **Tronco Encefálico** | `CLAUDE.md` (este) | ✅ Siempre | Router + identidad + doctrinas + gobernanza. |
| ⚡ **Corto Plazo (WIP)** | `docs/10-MEMORIA-CORTO-PLAZO.md` | ✅ Siempre (2ª lectura) | Sprint actual, pendientes (TODO-NN), cache version, estado vivo. |
| 🗺️ **Espacial** | `docs/20-MEMORIA-ESPACIAL.md` | ❌ on-demand | Trigger de Desorientación: dónde vive un componente, flujos, arquitectura, SEO, migración. |
| 🗂️ **Índice sináptico** | `docs/00-INDICE.md` | ❌ on-demand | ANTES de leer el historial, para el offset exacto del §. |
| 📚 **Largo Plazo** | `docs/99-HISTORIAL-ADR.md` | ❌ on-demand | Trigger de Error / detalle histórico de un §. NUNCA completo — usa offset/limit. |

**Hojas de detalle** (enlazadas desde la Memoria Espacial, no se leen directo salvo necesidad):
`docs/dependency-map.md` (deps JS), `docs/SITEMAP-FIX.md` (SEO/sitemap),
`docs/PLAN-MIGRACION-ALTORRA.md` (roadmap Cloudflare), `docs/SETUP-LLM.md` (LLM bot),
`docs/altor-hub-cirugia-execution-plan.md` (plan Hub §59).

### 🏆 Regla de oro anti-saturación (CÓMO leer el Largo Plazo)

NUNCA leas `docs/99-HISTORIAL-ADR.md` completo (41.730 líneas = muerte
por contexto). En su lugar:

1. `Read docs/00-INDICE.md` → encuentra la línea del § que buscas.
2. `Read docs/99-HISTORIAL-ADR.md offset=<línea> limit=~150` → lee SOLO ese tramo.

Ejemplo: para entender §61 RBAC → índice dice línea 26879 →
`Read docs/99-HISTORIAL-ADR.md offset=26879 limit=200`.

---

## §1 — Identidad y arquitectura (exprés)

- **Negocio**: ALTORRA Company SAS — compra/venta de carros usados, Cartagena, Colombia. Brand dorado `#b89658`.
- **Stack**: HTML/CSS/JS vanilla (sin framework, sin bundler) + Firebase Compat SDK **v11.3.0** desde CDN (NO modular). Firebase: Auth, Firestore, RTDB, Storage, Cloud Functions V2 (27 deployadas), FCM, Analytics.
- **Hosting**: GitHub Pages (`altorracars.github.io`). Deploy: push a `main` → auto-deploy. CI genera páginas de vehículos cada 4h desde Firestore (`scripts/generate-vehicles.mjs`).
- **Project ID**: `altorra-cars`. Auth domain `altorra-cars.firebaseapp.com`.
- **Apps namespaced** (§23.10 + §25.12): `altorra-admin` vs `altorra-public` aíslan sesiones; + una default app alias para internals del SDK.
- **Áreas**: sitio público (index, busqueda, detalle-vehiculo, marcas, etc.), panel admin (`admin.html` SPA), bot ALTOR Hub (cliente `js/concierge.js` + admin `js/admin-concierge.js`).
- **Costo recurrente**: ~$2-5 USD/mes (solo LLM Anthropic Haiku 4.5; resto Firebase free tier).
- **Secrets YA configurados** (NO re-preguntar ni reconfigurar): `EMAIL_USER`, `EMAIL_PASS`, `GITHUB_PAT`, `LLM_API_KEY`, `TELEGRAM_BOT_TOKEN`.
- **Deploys MANUALES** (nunca automáticos): `firebase deploy --only firestore:rules` / `database` / `storage` / `functions`. Un cambio en reglas del repo NO se aplica solo.

Detalle profundo de cualquier subsistema → `docs/00-INDICE.md` + tramo correspondiente del historial.

---

## §2 — Protocolo de documentación (OBLIGATORIO en cada commit relevante)

### Dónde documentar

- **WIP / tarea en curso**: se registra en el Corto Plazo (`docs/10-MEMORIA-CORTO-PLAZO.md`).
- **NUEVOS ADRs (§118 en adelante)**: al cerrar una tarea, se APENDEN al final del Largo Plazo (`docs/99-HISTORIAL-ADR.md`) + fila en `docs/00-INDICE.md` (consolidación §G.3). NUNCA a este CLAUDE.md.
- **Este CLAUDE.md**: solo se edita cuando cambia algo always-on (una doctrina, el esquema de nodos, una regla de gobernanza). NUNCA historial ni pendientes ni cache version.

### Cómo documentar (formato canónico ADR)

Cada cambio funcional se documenta con una sección numerada (§NN) que incluye:

```
## NN. ADR-NNN — <título corto descriptivo>

> Cita verbatim del cliente (si reportó el problema/feature).

### NN.1 Causa raíz (RCA §19)
   Diagnóstico real verificado leyendo el código (no suposiciones).

### NN.2 Solución estructural
   Qué se cambió y por qué (de fondo, no parche).

### NN.3 No-regresión
   Qué se preservó intacto (IDs, funciones, callsites). node -c OK.

### NN.4 Tests E2E
   Tabla numerada de casos a validar post-merge.

### NN.5 Anti-patterns evitados
   Cruce con doctrinas §17/§19/§35/§37.

### NN.6 Archivos modificados / INTACTOS
   Lista exacta + afirmación de lo que NO se tocó.

### NN.7 Doctrina aplicada + Cache bump
```

### Reglas git (de §commit del proyecto)

- Crear commits SOLO cuando el usuario lo pida explícitamente.
- `git add` archivos específicos (NUNCA `git add -A` / `.`).
- Mensaje vía HEREDOC con footer `Co-Authored-By: Claude <noreply@anthropic.com>`.
- NUNCA push sin pedido explícito. NUNCA `--amend`/`--no-verify`/`--no-gpg-sign` sin pedido.
- NUNCA commitear secrets (.env, credentials.json).
- Al cerrar un pendiente, marcar su `TODO-NN` (§5) como ✅ + link al §X.
- Mantener este CLAUDE.md liviano — el detalle va al historial.

---

## §3 — Doctrinas always-on (resumen ejecutable; detalle en historial §17/§19/§35/§37)

### 3.1 Performance (§17, §17.2)
- NUNCA `transition: all` ni `* { transition }` global.
- NUNCA animar layout props (width/height/top/left/margin/padding) — solo `transform`/`opacity`.
- NUNCA `backdrop-filter` en grids/listas de N elementos (solo superficies estructurales).
- Imágenes: `loading="lazy"` + `decoding="async"` below-fold; `fetchpriority="high"` solo LCP.
- `<picture>` srcset: verifica FÍSICAMENTE que las variants existan en `multimedia/optimized/` (el optimizer NO hace upscaling — lección §95/§96/§97).

### 3.2 HTML/CSS estable (§17.4)
- NUNCA renombrar IDs/clases existentes. Cambios aditivos.
- Para sustituir un campo manteniendo callsites: `<input type="hidden" id="mismoId">` (patrón §104).
- Preservar nombres de función exportados (callsites externos dependen).

### 3.3 RCA Mode estricto (§19) — "no quiero que supongas"
- LEE los paths de código ANTES de tocar. Verifica, no asumas.
- §111 falló por adivinar; §112 acertó por leer. El cliente exige info real verificada (§114).
- Cuando un bug es recurrente o el síntoma no encaja: telemetría → diagnóstico → reporte → STOP → autorización → fix.

### 3.4 IAP — Impact Analysis Previo (§37)
Antes de CUALQUIER commit: 5 secciones → (A) archivos a modificar, (B) archivos INTACTOS, (C) código muerto, (D) refactor, (E) riesgos + rollback + tests.

### 3.5 Anti-MutationObserver / anti-pointermove (§17.12, §35)
- CERO `MutationObserver` global con `subtree:true` que ejecute ops DOM (causó el bug histórico de clicks bloqueados §RCA). Usar refresh explícito desde el callsite.
- CERO `pointermove` persistente global (solo durante drag activo).
- Selectores substring `[class*="x"]` son peligrosos — matchean clases hijas; excluir namespaces con `:not()` (lección §101.1.6).

### 3.6 Bot ALTOR Hub (§57.7, §57.9, §60.1/§60.2, §71)
- `_chatsUnsub` (lista del Hub) SIEMPRE activo globalmente; solo `_messagesUnsub` (chat abierto) se cancela al cambiar de sección.
- Cliente: patrón "lazy reset on next open" — cierre solo oculta panel; reset al reabrir.
- Optimistic UI universal (cliente + admin): la UI nunca espera al server; estados ✓/✓✓/⚠ + rollback.
- Cloud Function role triggers: anti-loop por filtro de `roleId` change (§71).

### 3.7 Migración (§94)
Target = **Cloudflare Pages** (NO Vercel). Deploy en segundos + edge global. Plan en `docs/PLAN-MIGRACION-ALTORRA.md`. Bloqueado por presupuesto del dominio (~$10/año).

---

## §4 — Cache bump (OBLIGATORIO con cada cambio de comportamiento)

- Bumpear `service-worker.js` `CACHE_VERSION` + `js/cache-manager.js` `APP_VERSION`.
- Formato `vYYYYMMDDHHMMSS`. **La versión vigente vive en el nodo de Corto Plazo** (`docs/10-MEMORIA-CORTO-PLAZO.md`). El siguiente bump debe ser MAYOR. Tras bumpear, actualiza ahí el valor.
- Cliente final invalida con **Ctrl+Shift+R** la primera vez.
- **Conflicto de merge recurrente** (auto-cron de main bumpea mientras tu rama está activa): receta canónica → `git fetch origin main` → `git merge origin/main` → `git checkout --ours` ambos archivos (preserva tu changelog) → bump a timestamp MAYOR que main → `node -c` → commit merge → push. (TODO-14, detalle en historial §82-§84/§90.14/§97).

---

## §G — Gobernanza Neuronal (sistema nervioso · cómo operas la memoria)

Esta sección es tu sistema nervioso. Define qué lees, cuándo escalas y cómo
consolidas. **Es vinculante.**

### G.1 — Directiva de Ignorancia Selectiva (arranque de sesión)

Al iniciar una conversación nueva estás **estrictamente obligado** a leer SOLO:

1. `CLAUDE.md` (este — auto-cargado).
2. `docs/10-MEMORIA-CORTO-PLAZO.md` (el WIP vivo).

**IGNORA el resto del cerebro** (Espacial, Índice, Largo Plazo y hojas de
detalle) para ahorrar tokens, A MENOS que un trigger (G.2) o una petición
explícita del usuario te ordene leerlo. No leas el historial "por si acaso".

### G.2 — Triggers de Recuperación (Escalation Path)

Cuando se dispara un trigger, leer el nodo correspondiente deja de ser opcional:

- **🔴 Trigger de Error**: si fallas **2 veces** corrigiendo el mismo bug,
  estás OBLIGADO a DETENERTE y leer el **Largo Plazo** (`docs/00-INDICE.md` →
  tramo de `docs/99-HISTORIAL-ADR.md`) buscando el § del subsistema o un bug
  análogo, ANTES de intentar una 3ª solución. Prohibido adivinar (doctrina RCA §19).
- **🟡 Trigger de Desorientación**: si dudas de DÓNDE vive un componente, una
  ruta, un flujo de datos o cómo interactúan los módulos, estás OBLIGADO a
  consultar la **Memoria Espacial** (`docs/20-MEMORIA-ESPACIAL.md`) antes de tocar nada.
- **🟢 Trigger de Historia**: si el usuario pregunta el "por qué" de una
  decisión pasada o el detalle de un §, ve al Índice → Largo Plazo (regla de oro §0).

### G.3 — Protocolo de Consolidación (sinapsis)

La memoria fluye en una sola dirección: Corto Plazo → Largo Plazo.

- **Por cada commit / tarea finalizada**: actualiza `docs/10-MEMORIA-CORTO-PLAZO.md`
  (foco actual, bitácora, estado de TODO-NN).
- **Cuando una tarea se cierra por completo**: MUEVE ese recuerdo del Corto
  Plazo al Largo Plazo — apéndalo como ADR `§NN` al final de
  `docs/99-HISTORIAL-ADR.md` (formato canónico §2), añade su fila en
  `docs/00-INDICE.md`, marca su `TODO-NN` como ✅ con link al §, y retíralo de
  la tabla de pendientes del Corto Plazo.
- **Regla de Oro**: NUNCA documentes historial ni tareas en este `CLAUDE.md`.
  Cada pieza de información tiene su nodo. Este archivo solo cambia si cambia
  algo always-on (una doctrina, el esquema de nodos, una regla de gobernanza).

---

## §7 — Cómo retomar en una sesión nueva

1. Lee `CLAUDE.md` (auto-cargado) + `docs/10-MEMORIA-CORTO-PLAZO.md` (Ignorancia Selectiva §G.1).
2. Si el cliente pregunta "¿qué hay pendiente?" → tabla TODO-NN del Corto Plazo.
3. Si te desorientas → Memoria Espacial (`docs/20-MEMORIA-ESPACIAL.md`) [Trigger §G.2].
4. Si fallas 2× un bug o necesitas detalle de un § → Índice → Largo Plazo [Trigger §G.2 / regla de oro §0].
5. Antes de tocar código: IAP §37. Antes de commit: protocolo §2. Después: cache bump §4 + consolidar §G.3.
6. **Entorno**: Windows + PowerShell. Working dir ya está en el repo — no `cd`.
7. Cliente final invalida cache con **Ctrl+Shift+R**.
