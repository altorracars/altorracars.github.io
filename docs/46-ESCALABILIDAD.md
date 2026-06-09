# 🏗️ 46 — ARQUITECTURA & ESCALABILIDAD (lóbulo de dominio)

> Lóbulo registrado en `40-LOBULOS-DOMINIO`. Disparador: Trigger 🔵 §G.2 con
> palabras "arquitectura", "escalabilidad", "modernización", "monolito", "refactor
> estructural", "desacoplar", "escalar". Nació del **mandato de arquitecto** que el
> cliente dictó el 2026-06-05 para la reconstrucción del CRM (ver `crm-handoff.md`).
>
> **Qué es**: la doctrina de arquitectura always-on del proyecto + las decisiones
> técnicas right-sized para Altorra. Se lee al diseñar/tocar estructura del sistema.
> **Tope blando ~280 líneas (§G.5)** — si crece, shard (ej. `41-SEGURIDAD` cuando
> diseñemos las reglas Firestore concretas).

## Skills consultadas
- **`crm-architect`** — framework CRM sobre Firebase + Firestore + Cloud Functions;
  vertical `automotive-dealership` + matriz `world-class-crm-matrix`. Dio el espinazo
  (people→deals→activities→automation→insight) y el estándar a igualar.

---

## 1. El mandato del arquitecto (palabras del cliente · 2026-06-05)

Pensar como **arquitecto de software**, no solo escribir código: decidir cómo se
**conecta** el sistema, cómo **escala**, cómo se **mantiene**, cómo se mantiene
**seguro** y cómo **evoluciona**. Lentes obligatorias en CADA decisión:

| Lente | Qué exige |
|---|---|
| **Visión de negocio** | Resolver el problema real hoy, listo para crecer mañana. |
| **Escalabilidad** | Soportar más carga sin perder rendimiento ni estabilidad. Diseñar para el crecimiento, no parchear después. |
| **Seguridad** | AuthN, AuthZ, cifrado en tránsito y reposo, validación, gestión de secretos, monitoreo/auditoría — **desde el inicio, no al final**. |
| **Costo** | Cada decisión tiene impacto financiero (infra, rendimiento, mantenibilidad, equipo). "No gastar menos: invertir mejor." |
| **Mantenibilidad** | Sistemas limpios, modulares, fáciles de evolucionar. **CERO monolitos.** |
| **Comunicación** | Servicios que se integran y trabajan como un todo (APIs, eventos, colas, webhooks). |

Frase guía: **"La mejor arquitectura no es la más compleja, es la que genera más
valor con menos fricción."**

## 2. La realidad de Altorra (las restricciones que mandan)

- **$0 de presupuesto** · sin dominio propio aún · stack ya integrado: GitHub Pages +
  Firebase + Node.js. NO se pueden añadir servicios pagos todavía.
- **3 personas** usando el CRM hoy; **en crecimiento** → diseñar para que escale sin reescribir.
- **Aún sin ventas** → greenfield de datos: el flujo se diseña para el futuro, sin migración pesada.
- Concesionario de usados, Cartagena. Sin retoma (parte de pago) por ahora.

## 3. Decisiones de arquitectura (ADR-style · right-sized)

> Regla anti-over-engineering: la disciplina enterprise se HONRA, no se copia ciega.
> Firebase ya da escala horizontal, desacople y eventos **sin** microservicios. Añadir
> gRPC/Kafka/microservicios aquí sería complejidad sin valor → se rechaza conscientemente.

- **AD-1 · Serverless event-driven sobre Firebase.** Firestore/Functions/Auth/Storage/FCM
  autoescalan a miles sin administrar servidores. Es la base que da "escala horizontal" gratis.
- **AD-2 · Cero monolitos = romper los 2 monolitos reales del código.** `admin.html` (~3.870
  líneas, ~94 scripts) y `functions/index.js` (~3.500 líneas, 28 functions) son los enemigos.
  Se parten en **módulos por dominio** con interfaz clara y despliegue/edición independiente.
- **AD-3 · Frontend en capas + módulos de feature.** Capa **datos** (Firestore helpers) /
  capa **dominio** (scoring, NBA, pipeline, reglas — lógica pura testeable) / capa **UI**
  (render). Cada módulo: una responsabilidad, una interfaz, **lazy-load** (cargador dinámico
  existente). Sin bundler por ahora (vanilla modular = $0, menor riesgo; Vite/Cloudflare = TODO-01 diferido).
- **AD-4 · Una sola fuente de verdad.** Captura omnicanal → modelo canónico en Firestore →
  todas las superficies leen **scoped + paginado + indexado**. ⛔ Prohibido el patrón actual
  `AP.appointments` (carga TODAS las solicitudes en memoria = cuello de botella que NO escala).
- **AD-5 · Patrones de comunicación (qué SÍ / qué NO).**
  - SÍ: SDK Firestore (lectura/escritura sync) · **Callable Functions = "la API"** para ops
    privilegiadas · **Firestore triggers + Pub/Sub = bus de eventos** (async desacoplado) ·
    **Cloud Tasks / scheduled Functions = colas/tareas pesadas** (postventa, SLA) · **webhooks**
    (Telegram, GitHub dispatch) para externos.
  - NO (sin valor a esta escala): gRPC, GraphQL, Kafka, microservicios con infra propia.
- **AD-6 · Seguridad por diseño.** AuthN = Firebase Auth · AuthZ = RBAC (`usuarios.rol`+`permissions[]`)
  con **Firestore rules deny-by-default = la barrera real** (el front es solo UX) · validación
  en cliente + rules + Functions · **secretos solo en Functions config** (nunca en cliente) ·
  `auditLog` inmutable + monitoreo de anomalías · cifrado en tránsito (HTTPS) y reposo (Firebase
  default) · **Habeas Data (Ley 1581)**: consentimiento previo/expreso/informado en cada captura.
  → Cuando diseñemos las rules concretas, nace el lóbulo `41-SEGURIDAD` con la auditoría.
- **AD-7 · Guardas de escalabilidad.** Paginación por cursor + índices compuestos · cero full-scans
  en cliente · capas de cache (Firestore offline + Service Worker + CDN GitHub Pages) · read-shapes
  denormalizados · queries acotadas · `_version` (optimistic locking) en escrituras concurrentes.
- **AD-8 · Disciplina de costo.** Permanecer en free tier; vigilar conteo de reads/writes;
  BigQuery export SOLO si el reporting crece; integraciones pagas (WhatsApp API, e-sign, dominio)
  **diferidas hasta haber presupuesto** — el diseño las deja "enchufables" sin reescribir.
- **AD-9 · Evolución por configuración.** Pipelines, reglas de automatización y campos custom
  viven como **documentos de config en Firestore** → el admin cambia comportamiento sin tocar código.

**Monolito → por-componentes (lo que dejamos → lo que construimos):**
| Monolito | Por-componentes |
|---|---|
| Difícil de escalar · despliegues riesgosos · alto acoplamiento · cambios lentos · costos crecientes | Escalable por módulo/dominio · despliegues/ediciones independientes · bajo acoplamiento · cambios rápidos y seguros · costos optimizados |
| `admin.html` ~3.870 líneas · `functions/index.js` ~3.500 líneas | `admin-app/` modular (datos/dominio/ui) + Functions por dominio |

> Frases-faro (cliente): *"El código hace que funcione; la arquitectura hace que sobreviva."* · *"Un sistema escalable hoy es un negocio sostenible mañana."* · *"Un sistema seguro no es más complejo, es más confiable y resiliente."*

## 4. Disparadores de "ahora sí escala más" (cuándo subir de nivel)
- Reporting pesado / cross-tenant → activar **BigQuery export**.
- Búsqueda full-text (no solo filtros) → **Algolia/Typesense**.
- Presupuesto disponible → **dominio propio** + **WhatsApp Cloud API** (cerrar la fuga del canal).
- Tooling/escala de equipo → evaluar **Vite + Cloudflare Pages** (TODO-01).

## 5. Punteros
- Blueprint detallado (modelo de datos, colecciones, mapa de módulos, rules, plan por fases) → **`docs/superpowers/specs/2026-06-05-crm-rebuild-design.md`**.
- Estado actual del CRM + censo de captura + duplicación → `docs/crm-handoff.md` §1/§8.
- Decisión cara de revertir (modelo de datos / RBAC) → consultar 🛰️ `docs/15-CONSEJO-EXTERNO.md` antes de fijar.

## 6. Pendientes / próxima ronda
- Escribir el spec de arquitectura (blueprint) y validarlo con el cliente.
- Definir el modelo de datos canónico del CRM (colecciones + read-shapes) — candidato a Consejo Externo (Gemini).
- Al diseñar reglas Firestore → abrir `41-SEGURIDAD`.
