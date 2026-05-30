# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

> **Pizarra podada al cierre de sesión 2026-05-30** (contexto saturado → handoff a ventana
> nueva). El detalle histórico vive en los ADRs **§122–§138** (`99` + `00-INDICE`). Aquí solo el estado vivo.

- **REDISEÑO TOTAL cinematic — COMPLETO** (§122 index + §124 SP-5.0 + §126/§127 SP-5.1 chrome global
  + §128–§137 SP-5.2 cuerpo de TODAS las páginas). Index, legales, 404, nosotros, contacto, reseñas,
  perfil, favoritos, comparador (flotante+página) y simulador están en el tema cinematic. Header/footer
  unificados (§133). Todo **commiteado** (último `d62f058`).
- **SP-4 recomendaciones — FASE 1 hecha** (§138): motor por **similitud al rastro** (content-based local,
  `js/core/recommendations.js`). El trail del index muestra autos semejantes al rastro (no los vistos;
  esos quedan en QuickTools/perfil). Pesos ajustables en el objeto `W`.

### ← Para RETOMAR (ventana nueva)
> Sesión 2026-05-30 (B): branch sincronizada con `origin/main` (FF limpio), pulido comparador hecho,
> validación en **localhost preview** (no prod). Lección preview local → **L-20**.

1. **Validar en PRODUCCIÓN** (Ctrl+Shift+R) — pendiente (localhost ya OK, pero Auth/Analytics 403 ahí por L-08):
   - SP-4: ver 2-3 fichas → el index muestra "Recomendados" **semejantes**.
   - Comparador: flotante abajo-izq no choca con QuickTools (⊞); slots A/B + picker inline + diff dorado.
   - Perfil/favoritos: dashboard/cards en cinematic.
   - ✅ **Validado en localhost**: comparador (CTA nuevo "Explorar vehículos", empty state, 27 autos cargan)
     + simulador (cinematic OK, calcula $45.5M→cuota $1.140.601 18.86%EA, dorado `212,168,90` consistente).
2. **Detalles puntuales por pulir**:
   - ✅ **Comparador CTA "Ir al catálogo" → "Explorar vehículos"** hecho (`comparar.html:269` `.cmp-empty-cta`).
     `.cmp-back` (línea 185) se dejó como "Volver al catálogo" a propósito (back-link con flecha).
   - ⚠️ **Simulador "grises del 2º bloque" NO SE REPRODUCEN** (RCA §19): el panel de resultados usa solo
     superficies cinematic (morado `21,18,26` / negro `8,7,10` / dorado). El único gris `128,128,128`
     está en el **footer GLOBAL** (`footer-legal`/`footer-bottom`) — si molesta, es tarea de footer, no del simulador.
     Re-confirmar con el cliente QUÉ gris vio antes de tocar.
3. **Diferido sin urgencia**: SP-4 **fase 2** (popularidad global = contador `vehiculos/{id}.views` en Firestore + reglas; custom image upload destacados; real-time switch sesión). SP-5 polish fino. Auditorías `44-SEO`/`45-PERFORMANCE`/`48-ACCESIBILIDAD` cuando se pidan.

### Patrón clave de la sesión (SP-5.2)
**Armonización por remapeo de tokens `:root`/CSS (L-17/L-18) > reescritura**, cuando el JSX de referencia
es un mock más pobre que el módulo real (perfil, favoritos, simulador). Reescritura solo donde el diseño
aportaba estructura nueva (reseñas, comparador). Motor recomendaciones → **L-19**. Git stale (no afirmar
despliegue sin `fetch`) → **M-06**.

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-04** | Resource hints (preconnect) | ✅ hecho | propagado por cron |
| **TODO-05** | SEO local / metadata | ✅ hecho | OG/Twitter/AutoDealer §90 |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| ~~TODO-14~~ | ~~Patrón merge conflict cron~~ | ✅ → L-02 | — |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📦 Planes mayores (resumen vivo — todos cerrados ✅)

- **§122** SP-1 Index cinematic vanilla (port JSX→vanilla, 4 módulos `js/public/home/*`, contratos preservados).
- **§119** reorg `js/` modular (128 archivos) · **§120/§121** cerebro autónomo + linter `brain:check`.
- **§61** RBAC dinámico · **§59** ALTOR Hub (7/7 + C-S8/9/10) · **§82-84** Smart Update · **§90** SEO Fase 4 · **§91/93** imágenes responsive + lazy · **§115-117** motor cromático (6 paletas) · 27 Cloud Functions.

---

## 🔮 Contexto estratégico

- **Rediseño TOTAL cinematic + recomendaciones (fase 1) ENTREGADOS.** El sitio está
  visualmente completo de punta a punta. Lo que resta: validación en producción + pulido
  fino + diferidos (SP-4 fase 2, auditorías por dominio). Buen momento para QA en prod y
  priorizar mejoras incrementales según feedback real de usuarios.

## 📝 Bitácora (efímera — se vacía al consolidar)

- *(vacía — sesión 2026-05-30 consolidada en ADRs §131–§138 + lecciones L-17/L-18/L-19 + M-06/M-07; todo commiteado hasta `d62f058`)*
