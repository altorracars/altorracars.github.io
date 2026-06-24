# 🧭 PLAN UNIFICADO — Un solo panel admin (camino único) ⟦OPUS-4.8⟧ · BORRADOR pre-Gemini

> Pedido del dueño (2026-06-24): "muchos planes pero sin un plan unificado… haz un survey masivo de
> todo + todos los planes → UN plan completo de un solo camino para llegar lo más pronto posible a la
> unificación de los paneles admin." Decisión Fuerte (comité ✅ · Gemini PENDIENTE · verificar claims).
> Basado en: survey de 5 agentes (in-cwd, run `wf_668bd020-e80`) + `crm-handoff.md` (vault) + specs F4/F5.

## 🌟 NORTH STAR
**UN portal = `admin-app/`** (Vite modular). `admin.html` retirado (cuarentena `_legacy/`, no borrado). **Un login, un shell, un RBAC, un inbox.** "Cero monolitos."

## 0. Las dos superficies (verificado)
- **VIEJO `admin.html`** (~3921L + 78 módulos `js/admin/`): 21 secciones + shell completo (RBAC dinámico, router/registry+aliases, offline/PWA/sync, presencia, FCM/Telegram, command-palette). **Aloja el ALTOR Hub** (`#sec-concierge`).
- **NUEVO `admin-app/`** (Vite + Firebase modular, app `altorra-crm`, mismo projectId → run-paralelo): 14 rutas, **todas construidas con Firebase real** (`mock` = solo demo `?mock=1`). Auth por `usuarios/{uid}` (claims diferido a "Fase 5").

## 1. Lo que `admin-app/` YA cubre (✅ done)
Core (firebase/auth/store/audit-write/router/shell/login/design-system) · domain (scoring/nba/pipeline/…) · **Inventario** (vehicles/brands/dealers/lists) · **Sitio público** (banners/reviews/cms-dinamico) · **CRM** (inbox/deals/contacts/capture-convert) · **Agenda** · **Reportes** · **Config(availability)** · **Backup**.

## 2. EL GAP — lo que falta en `admin-app/` para apagar `admin.html`
**A. Config/Administración:** Usuarios · Roles(RBAC) · Departamentos · Workflows/Automation · **visor de Auditoría** (hoy solo escribe, no lee) · Ajustes generales (tema/SEO/sitemap).
**B. Comunicaciones:** **ALTOR Hub** (chat admin) · Cerebro AI (KB) · "Lo que no entendí" (unmatched).
**C. Home/Dashboard** (Inicio: hero KPIs/NBA) — el app nuevo aterriza en Bandeja.
**D. Divergencia IA:** CRM clásico = 1 sección con tabs; nuevo = 3 rutas (bandeja/pipeline/contactos) → reconciliar la arquitectura de información.

## 3. El ancla más fuerte: el CRM canónico es BACKEND-OWNED
`contacts`/`leads`/`activities`/`deals` + `dedup` + `failedIngestions` (dead-letter). **6 canales de captura LIVE** vía triggers `onDocumentCreated` (todos comparten `ingestLead.js` transaccional + dedup determinista + round-robin owner + DLQ retry):
1. Form/cita público → `solicitudes` → `onSolicitudCreated`
2. Bot LLM `submit_lead` → `solicitudes`(origen:bot) → idem
3. Concierge widget (soft-lead phantom + gate real) → `solicitudes` → idem
4. Asesor quick-intake → `lead_intake` → `onLeadIntakeCreated`
5. Registro cuenta → `clientes` → `onClienteCreated` (contacto, no lead)
6. Newsletter → `subscriptions` → `onSubscriptionCreated` (contacto+consent, no lead)
→ **Ambos paneles ya leen la MISMA verdad.** Unificar = consolidar UI, **NO tocar la ingestión**.

## 4. 🩸 Fugas de leads (el "cero fugas" del dueño — verificado)
- **`unmatchedQueries`** (preguntas que el bot no entendió) → NO tiene trigger de ingestión → si un comprador real pregunta algo y se va, intent perdido.
- **Chat concierge abandonado** (soft-lead sin completar gate) → cae en `failedIngestions`, nadie lo revisa como señal de venta.
- **Escalación a humano sin captura** → si no se escribe `solicitudes`/`lead_intake`, no hay registro CRM.
- **`failedIngestions` sin reprocesador automático** → un fallo persistente deja un lead real fuera del CRM indefinidamente.
- **Consent bot = `false`** (Ley 1581, texto sin abogado, gate P4) → estado de consentimiento inutilizable hasta que aterrice ese gate.

## 5. ⚖️ La DECISIÓN CENTRAL (Decisión Fuerte → Gemini)
**¿Dónde vive el Hub?** El verdicto F4/F5 (Gemini, Fase C) eligió **"sandbox en el monolito"** (`#sec-concierge-v2` dentro de `admin.html`). PERO si el Hub se queda en el viejo, **`admin.html` no se puede apagar nunca** → unificación imposible. Ese verdicto optimizó el aislamiento del rediseño F4/F5 **en vacío**; con la meta de UN portal es incompatible.
**Resolución del comité (U1/U2):** el Hub v2 se construye como **módulo de `admin-app/`** (`modules/comunicaciones` o `modules/hub`), NO sandbox en el viejo. La fragmentación auth/sesión que Gemini temía hay que pagarla una sola vez igual (es el punto del portal único). → **red-team de Gemini sobre ESTA re-decisión.**

## 6. 🛣️ EL CAMINO ÚNICO (fases ordenadas — strangler, sin big-bang)
> Cada módulo entra detrás de su gate (`admin-cutover-gates.js` patrón: Ocultar≠Borrar); `admin.html` se apaga SOLO al llegar a paridad.

- **F-0 · Decisión Fuerte del Hub (U1/U5):** confirmar destino `admin-app/` para todo incl. Hub + diseño de la migración auth/sesión única. **Gate: Gemini + dueño aprueban.**
- **F-1 · Track BOT widget público (independiente, no bloquea unificación):** terminar bot v2 (TODO-38 Fase D→E) detrás del flag — captura real, SLA, WhatsApp, Firestore, vehicle-cards, modal cierre, command-queue + API global idéntica. Free Core buttons-only ships sin saldo LLM. *(Corre en paralelo; es público, no panel.)*
- **F-2 · Cerrar el gap Config en `admin-app/`:** Usuarios → Roles → Departamentos → Workflows → visor Auditoría → Ajustes(tema/SEO). *(No depende del bot ni del LLM — arranca YA.)*
- **F-3 · Home/Dashboard** en `admin-app/` (hero KPIs/NBA) — para que el portal tenga su Inicio.
- **F-4 · Comunicaciones en `admin-app/`:** **Hub v2** (el más pesado: preservar RBAC concierge.*, claim/transfer/notes/typing/read-receipts/presencia) + Cerebro AI (KB) + Unmatched, como módulos del portal nuevo. *(Aquí confluyen TODO-38 Fase F + la migración.)*
- **F-5 · Cierre de fugas (§4):** enrutar unmatched + chats abandonados + failedIngestions a UN inbox del portal + reprocesador del DLQ. **Cero fugas verificable.**
- **F-6 · CUTOVER:** paridad → flag → `admin.html` a cuarentena `_legacy/` (`anti-codigo-muerto`, no borrar). **Trigger de retiro del monolito = checklist de paridad ✅.**
- **F-7 · CLEAN SLATE + re-validación E2E (pedido del dueño):** purgar TODO el CRM (contactos/pipeline/reportes/bandeja/test PRUEBA-CLAUDE) → re-validar los 6 canales → canónico → portal end-to-end, **cero fugas**, desde cero.
- **Diferidos al final:** LLM-enable (saldo Anthropic, secuenciado aparte) · comercial/comisiones TODO-25 · facturación TODO-26 · CMS-total TODO-23(resto) · Cloudflare+Vite TODO-01 (bloq. dominio). Deploy bajo **TODO-30 Doble-Llave+Staging**.

## 7. Invariantes (innegociables)
1. **Cero fugas de leads** (la ingestión canónica NO se toca; las fugas §4 se cierran, no se crean).
2. **Run-paralelo / Ocultar≠Borrar** hasta paridad (sin big-bang, rollback por gate).
3. **Un solo RBAC/login/shell** en el portal final (no re-importar la deuda de roles legacy/deprecated).
4. **No romper el sitio público** (el puente `comm-schema.js` lo consume).
5. **Free Core ships sin LLM**; el saldo Anthropic no bloquea la unificación.
6. **Clean-slate + E2E "cero fugas"** como gate final antes de declarar unificado.
7. Deploy de dinero/prod bajo Doble-Llave+Staging (TODO-30).

## 8. Reconciliación de los planes dispersos (a dónde va cada uno)
- **TODO-38 F4** (bot widget) → **F-1** (track público independiente). **TODO-38 F5/F** (Hub) → **F-4** (módulo admin-app, NO sandbox monolito — re-decidido).
- **TODO-34** (bot LLM) → enable diferido (saldo); su F4/F5 ya absorbido por TODO-38.
- **TODO-19/21** (CRM E0→E6) → ES la columna vertebral F-2..F-6.
- **TODO-23** (CMS) → ya en admin-app; resto al final. **TODO-25/26** (comercial/facturación) → diferidos, sobre el portal unificado.
- **TODO-01** (Cloudflare+Vite) → diferido (dominio); define el stack final del portal.
- **TODO-28/29/30/32** (cerebro/gobernanza) → meta; TODO-30 gobierna CÓMO se despliega el portal.

## 9. Pendiente Decisión Fuerte (Gemini) → §10 cuando se verifique
Red-team de: la re-decisión del Hub (admin-app vs sandbox-monolito), la migración auth/sesión única, el orden de fases (¿el más corto y seguro?), el riesgo de cutover, el cierre de fugas, y el stack final (Vite admin-app vs no-bundler widget vs Cloudflare+Vite whole-site).
