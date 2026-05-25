# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md`, este es
> el ÚNICO archivo que lees al iniciar cada sesión (Directiva de Ignorancia
> Selectiva, ver `CLAUDE.md §G`). Contiene SOLO lo vivo: en qué trabajamos
> hoy, pendientes abiertos, versión de cache y estado de planes.
>
> **Regla de consolidación**: cuando una tarea se cierra por completo, su
> "recuerdo" se MUEVE de aquí al nodo de Largo Plazo (`docs/99-HISTORIAL-ADR.md`
> como ADR §NN) y se marca su `TODO-NN` como ✅ con link al §. Este archivo
> nunca debe crecer indefinidamente — es la pizarra, no el archivo.

---

## 🎯 Foco actual

- **EN CURSO — §119 Reestructuración de frontend** (rama `refactor/estructura`, NO mergeada a main). Plan de 5 fases, riesgo escalonado. Objetivo: orden modular sin romper URLs públicas (ruta=URL en GitHub Pages, sin bundler). NO replicar la imagen React/Vite literal. La migración Vite real es TODO-01 (~1 año).
  - **Fase 0** ✅ rama creada + rastreo de dependencias.
  - **Fase 1** ✅ commit `f071461`: cuarentena `_legacy/` (notifications-demo, admin-upload, admin-components) + `backups/` fuera de git. Cero refs rotas verificado. Prueba local (localhost:3000) OK — errores de consola eran solo restricción de referer de Firebase (Auth/Installations/Analytics bloqueados en localhost), NO de los cambios. Firestore carga 27 veh/18 marcas, snippets/ vía fetch OK.
  - **Validado §119**: `admin-upload.html` confirmado MUERTO — sin auth, las rules actuales (§68 `isSuperAdmin()`) rechazarían sus escrituras. (El §2 del historial lo describía mal como "subida de imágenes"; corregido en `_legacy/README.md`.)
  - **Fase 2** ⏳ reagrupar `js/` (109 archivos planos → subcarpetas core/public/admin/concierge/ai). EL núcleo. Toca ~900 refs (uniformes por `<base href="/">`) + generador + SW.
  - **Fase 3** ⏳ reagrupar `css/` (31 planos).
  - **Fase 4** ⏳ actualizar `scripts/generate-vehicles.mjs` (cron cada 4h — PELIGRO #1 si no se sincroniza) + `service-worker.js`.
  - **Fase 5** ⏳ E2E + consolidar ADR §119 a Largo Plazo.
  - **Decisión tomada**: subcarpetas DENTRO de `js/` y `css/` (ej. `js/core/`), NO un `assets/` nuevo → menos rutas tocadas, mismo beneficio.
  - **NO tocar**: `snippets/` (runtime `fetch()` en components.js), `v/` (links de compartir externos), `admin.html` monolito (refactor aparte), toolchain (bun+npm cumplen roles distintos).
- **Última acción previa**: ✅ Arquitectura Documental Neuronal cerrada como ADR §118.
- **Branch activa**: `refactor/estructura` (verificar con `git branch --show-current`).
- **Cache version actual**: `v20260525010000` — el siguiente bump debe ser MAYOR (formato `vYYYYMMDDHHMMSS`).

---

## 📋 Pendientes abiertos (TODO-NN)

> Inventario vivo. Al cerrar uno: marcar ✅ + link al ADR §X en Largo Plazo, luego retirarlo de esta tabla en la próxima consolidación.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01** | Dominio + Cloudflare DNS + email pro + Cloudflare Pages (Vite) → deploy en segundos | 🔮 | ~$10/año dominio |
| **TODO-02** | Fase C Smart Update (hash-based assets) — depende de TODO-01 | 🔮 | hereda TODO-01 |
| **TODO-03** | Sprint 3C — Critical CSS inline | 🔮 listo | — (4h, $0) |
| **TODO-04** | Sprint 3D — Resource hints (preload/preconnect/defer) | 🔮 listo | — (2h, $0) |
| **TODO-05** | Metadata local SEO en páginas faltantes (contacto/nosotros/etc.) | 🔮 listo | — (1h, $0) |
| **TODO-06** | Página `/cartagena.html` dedicada SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07** | Validar métricas CSAT (§87) en producción | 🔮 | ~50 chats/mes |
| **TODO-08** | Validar transferencias entre asesores (§88) | 🔮 | equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica (drafts diferidos, CSS muerto, dead code drafts viejo, transition:all restantes, auditar substring selectors) | 🔮 | limpieza opcional, sin impacto visible |
| **TODO-14** | Patrón merge conflict auto-cron (receta `CLAUDE.md §4`) | ♻️ operativo | — |

**Orden recomendado sin inversión**: TODO-04 → TODO-03 → TODO-05 → TODO-06.

Detalle ampliado de cada pendiente → Largo Plazo `docs/99-HISTORIAL-ADR.md` §109.

---

## 📦 Estado de planes mayores (resumen vivo)

> Todos cerrados hoy. Si uno se reabre, su trabajo activo vuelve a aparecer arriba en "Foco actual".

- **§61 RBAC dinámico**: ✅ 100% (roles custom, permisos por checkbox, CEO único, triggers, R8 refactor 174 callsites §89).
- **§59 ALTOR Hub**: ✅ 7/7 sprints + C-S8/S9/S10 (optimistic UI, typing, read receipts, presence, rediseño, welcome contextual, CSAT, notes/transferencias).
- **§82-§84 Smart Update**: ✅ producción (pill + toast catálogo + smart navigation + cross-tab dedup).
- **SEO Fase 4** (§90): ✅ rich snippets + Google Business Profile (5.0★, 62 opiniones).
- **Fase 3 Performance**: ✅ 3A imágenes responsive (§91) + 3B lazy (§93); pendiente 3C/3D (TODO-03/04).
- **Motor cromático admin** (§115-§117): ✅ 6 paletas, superficies teñidas, texto legible.
- **27 Cloud Functions**: ✅ deployadas.

---

## 📝 Bitácora de sesión (efímera)

> Notas de la sesión en curso que aún no son un ADR. Se vacían al consolidar.

- 2026-05-25 — Arquitectura documental neuronal implementada y consolidada como ADR §118: nodos de Corto Plazo + Espacial + gobernanza §G (Ignorancia Selectiva + Triggers + Consolidación) en CLAUDE.md. Migración lossless verificada.
