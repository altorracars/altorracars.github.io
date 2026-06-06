# Blueprint Fase 2 — La Bandeja Inteligente + app admin greenfield (diseño)

> **Fase 2 (diseño, SIN código).** Continúa el blueprint maestro (`2026-06-05-crm-rebuild-design.md`).
> Autor: Claude (arquitecto). Fecha: 2026-06-05. Cliente delegó: *"hazlo a tu criterio, dame todo lo necesario"*.
> Fundamentos: blueprint §7/§8 (5 superficies, greenfield+Vite, claims), `world-class-crm-matrix`, vertical concesionario,
> Fase 1 LIVE (modelo canónico `contacts`/`leads`/`activities` + ingestión desplegada).
>
> **Estado**: 🟡 BORRADOR. Al construir → `writing-plans` por slice → ADRs §159+. (§158 = Fase 1.)

---

## 0. Restricción dura del cliente (manda sobre el diseño)
- **🔴 ALTOR (el bot) NO es confiable aún** (lo arreglamos DESPUÉS de terminar el CRM). → **La Bandeja NO depende de ALTOR ni del LLM.** Su inteligencia viene del **motor heurístico determinista ya construido** (puntaje 7 factores, NBA 10 reglas, predictivo — `admin-crm.js`/`nba.js`/`admin-predictive.js`, 100% client-side, sin LLM). Las "linduras" con IA generativa (resúmenes de 1 línea, borradores de respuesta) = **capa OPCIONAL diferida** hasta que ALTOR/LLM sea sólido. La Bandeja debe ser 100% útil sin ellas.

## 1. Resumen ejecutivo (plain)
La pantalla donde el equipo **ve y trabaja** todos los clientes capturados (los que la Fase 1 ya archiva). No es una lista boba: está **ordenada por urgencia** ("a quién contestar YA"), con un **puntaje confiable** por cliente, **acciones de un clic** (WhatsApp, asignar, agendar) y diseño **rápido y hermoso**. Vive en una **app nueva e independiente** (moderna), que corre en paralelo a la vieja hasta reemplazarla.

## 2. Arquitectura de la app (greenfield, decidida en blueprint maestro)
- **App nueva** `admin-app/` (NO se construye dentro del `admin.html` viejo). **Vite** empaqueta a `dist`; **Firebase modular SDK** (tree-shake). Se sirve en GitHub Pages en **ruta nueva** durante el run paralelo → cutover cuando alcance paridad. Sitio público intacto.
- **Capas** por módulo: `datos` (Firestore) / `dominio` (lógica pura: scoring, nba, classify) / `ui` (render). Carga **lazy**.
- **Diseño**: sistema **HarmonyOS** del cliente (tokens). Rápido, accesible (WCAG AA), responsive, `prefers-reduced-motion`.
- **Estado/reactividad**: store ligero + `onSnapshot` **acotado** (paginado + `unsubscribe` al cambiar de vista — regla dura P4/§15.R3, cero full-scan).
- **Seguridad**: **custom claims** (`role`); reglas ownership. **Deploys los ejecuta Claude** (CLI auth presente).

## 3. La Bandeja Inteligente (el corazón) — 4 pilares

### 3.1 Triage-first (ordenada por "qué necesita atención AHORA")
Colas (no una lista cronológica):
- 🔥 **Calientes sin contestar** (score≥70 y sin respuesta) — con **cronómetro SLA** ("respóndelo en N min"). *Speed-to-lead = el #1 para vender carros.*
- 👤 **Mis asignados** · 🆕 **Sin asignar** · 📥 **Todo**.
- **Filtros**: tipo (lead/cita/solicitud/PQR) · canal (web/WhatsApp/bot/cuenta/newsletter) · estado · fecha · **búsqueda** (cliente-side sobre el set paginado + campos normalizados — §15.R1, $0).

### 3.2 La tarjeta de cliente (de un vistazo, sin abrir nada)
`Nombre · qué quiere (resumen heurístico de tipo+vehículo) · vehículo de interés · hace cuánto · 🌡️ temperatura/score · canal · asesor · • punto SLA (verde/ámbar/rojo)`.

### 3.3 Inteligencia CONFIABLE (sin ALTOR)
- **Score** (7 factores, determinista) → temperatura caliente/tibio/frío.
- **NBA** (10 reglas) → "próxima mejor acción" sugerida por tarjeta.
- **Clasificación automática** del tipo (lead/cita/solicitud/PQR) derivada de `kind`/`tipo` del canónico — sin etiquetar a mano, sin LLM.
- *(Diferido: resumen LLM de 1 línea + borrador de respuesta — cuando ALTOR sea confiable.)*

### 3.4 Velocidad + cero trabajo manual
- **WhatsApp de un clic** (deep-link `wa.me` con plantilla pre-llenada — Colombia vive en WhatsApp).
- **Asignar** (a un asesor) · **cambiar estado** (contactado/…) · **agendar** · **abrir 360** — todo **inline**, sin ventanas que estorben, con **atajos de teclado**, en **tiempo real**.

## 4. Customer 360 (vista detalle)
Ficha por persona (reusa la lógica del 360 actual sobre el canónico): pestañas **Resumen · Comunicaciones (timeline de `activities`) · Score (desglose 7 factores) · Notas** (`contacts/{id}/crmNotes`). *(La pestaña "Red"/grafo y la de IA quedan para después — no críticas, y la de IA depende de ALTOR.)*

## 5. Asignación / ruteo de leads (decido yo — simple para 3, escalable)
- **Por defecto**: "**el primero que lo reclama**" (claim) + **asignación manual** (super_admin/quien tenga `crm.assign`).
- **Futuro (toggle)**: round-robin automático / por carga, cuando el equipo crezca (queda enchufable, no se construye ahora).

## 6. RBAC (del blueprint §6.1)
- Custom claims: `super_admin` (tú) + `asesor`. **Ahora: visibilidad ABIERTA** (todos ven todo) con **propiedad (`ownerId`) ya registrada**; el filtro "cada asesor ve solo lo suyo" = toggle de config para cuando crezcas. `gerente`/`bdc`/`viewer` predefinidos.
- Migración a claims: usa `migrateLegacyUsers` (ya existe).

## 7. Mapa de módulos (esta fase)
```
admin-app/src/
  core/        shell: router, auth(modular SDK), store, layout, design-system(HarmonyOS), event-bus
  modules/
    inbox/     (datos|dominio|ui)  LA BANDEJA (colas, tarjetas, filtros, acciones, tiempo real)
    contacts/  (datos|dominio|ui)  Customer 360
  domain/      PURO, portado del admin viejo SIN ALTOR: scoring(7), nba(10), classify, predictive
```

## 8. Datos (de Fase 1, ya LIVE)
Lee `leads`/`contacts`/`activities` (paginado + índices de Fase 1). Escribe: `leads.estado`/`ownerId` (asignar/estado), `contacts/{id}/crmNotes`, `activities` (al registrar una acción). Todo admin-only (reglas Fase 1).

## 9. Plan por slices (cada uno = ADR §159+, su propio writing-plans)
| Slice | Entrega | Valor |
|---|---|---|
| **2a · Fundación app** | `admin-app/` scaffold (Vite + Firebase modular + shell + auth + **claims** + tokens HarmonyOS) servido en ruta nueva | La app nueva existe y entra con tu cuenta |
| **2b · La Bandeja** | Lee canónico (paginado/tiempo real) → colas + tarjetas + filtros + búsqueda | **VES los clientes capturados** (¡la prueba visual de Fase 1!) |
| **2c · Acciones + 360** | WhatsApp 1-clic, asignar, cambiar estado, abrir 360 básico | Se vuelve operativa (trabajas desde ahí) |
| **2d · Inteligencia + pulido + cutover** | Score/NBA/clasificación visibles en tarjetas + pulido + apagar admin viejo (cuando haya paridad) | La "Bandeja Inteligente" completa |

## 10. Lo que NO hacemos aún (deliberado)
- ❌ Features con ALTOR/LLM (resúmenes, borradores) → cuando ALTOR sea confiable.
- ❌ Pipeline drag-drop (Fase 3) · ❌ Agenda unificada (Fase 3) · ❌ Reportes (Fase 4) · ❌ Slice 2 de captura (otros canales) — en paralelo o después.

## 11. Riesgos + mitigación
- **Greenfield + cutover**: run paralelo (ambas apps leen el mismo Firestore) → seguro; apagar la vieja solo con paridad.
- **Claims**: migrar usuarios con `migrateLegacyUsers`; refrescar token tras cambio de rol.
- **Costos/escala**: paginación estricta + `unsubscribe` + índices (cero full-scan). Deploys los ejecuta Claude.
- **Diseño**: replicar EXACTO el sistema HarmonyOS (el cliente exige réplica fiel + cero regresiones).

## 12. Estado
🟡 Diseño listo. **Construir empieza por el slice 2a** (fundación de la app). Ideal: arrancar el build con foco fresco (sesión nueva) — el cerebro hereda este diseño completo.
