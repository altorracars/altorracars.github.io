# Hallazgo: el flujo de Aliados documentado ≠ ejecutado (canary del dueño) — reconciliación cerebro↔realidad

> **Fecha:** 2026-06-26. Modelo: Opus 4.8 ⟦rev-Fable⟧. Origen: el dueño pidió buscar lo que reportó "una vez" sobre que "todo el flujo de aliados estaba mal" como test de fidelidad del cerebro (documentado ≠ ejecutado → auditar más a fondo, TODO-33).
> **Veredicto: el canary disparó.** El flujo comercial de aliados está DISEÑADO pero NO ejecutado, y los datos vivos lo confirman.

## Lo que el cerebro DOCUMENTA
- **§204** (99): aliados/concesionarios FASE 1 = port VERBATIM del clásico (CRUD de 8 campos planos, docId=slug). FASE 2 (modelo comercial) = gated D5-03 = TODO-25. **Honesto.**
- **§205** (99): gate legal del JSON-LD público — placa(VIN)+`seller=AutoDealer Altorra` SOLO si `esPropio` (`!v.concesionario || v.concesionario===''`). Verificado VIVO en `scripts/generate-vehicles.mjs:265,314-321`.
- **TODO-25** (10): RESTRUCTURA COMERCIAL (aliado/consigna/propio + comisiones) — **DISEÑO FROZEN, impl pend, "al FINAL"**. (= la captura de "el flujo estaba mal" que reportó el dueño.)
- **20-ESPACIAL**: aliados/dealers "(D5-03 gated)".

## Lo que la REALIDAD VIVA muestra (Firestore, 2026-06-26)
- **`vehiculos`** (20 muestreados): **0 con `concesionario=''` (propio)**. Todos asignados: `usados-de-la-costa` (18), `ernesto-pertuz` (1), `merwin-baiter` (1). `consignaParticular=''` en todos.
- **Campos de comisión** (`comisionAltorra`/`utilidadAltorra`/`utilidadTotal`/`canalVenta`): **undefined en TODOS** → `fetchDealerStats()` (dealers.data.js:47-51) computa comisiones=0 siempre (sin data fuente).
- **`concesionarios`** (6 docs): `alexander-daza`, `ernesto-pertuz`, `fernando-valiente`, `merwin-baiter` (personas, campos casi vacíos), `usados-de-la-costa` (negocio, 18 carros), **`dfsfdfdfs` (BASURA de prueba)**.

## El efecto cascada (no detectado)
El modelo asume "propio = `concesionario` vacío", pero **el 100% del catálogo real tiene un `concesionario`** → `esPropio=false` para TODO el catálogo → §205 **omite placa + `seller=AutoDealer Altorra` del JSON-LD de TODOS los vehículos públicos**. Si `usados-de-la-costa` es el inventario PROPIO de Altorra, §205 está **suprimiendo a Altorra como vendedor en el SEO de casi todo el catálogo** — efecto opuesto al documentado.

## Gap documentado ≠ ejecutado (la señal del dueño)
- El cerebro marca §204/§205 "✅" y lo están a nivel código — pero el **modelo comercial (propio/aliado/consigna/comisión) NUNCA se ejecutó**; el sistema vive sobre el string polimórfico sobrecargado `vehiculos.concesionario` ('' / slug / '_particular'), que ni siquiera usa '' ni '_particular' en la data real.
- `brain-check` valida estructura INTERNA, no realidad externa → exactamente el hueco de **TODO-33** (Reconciliación cerebro↔web real, marcado "PARCIAL").

## Pregunta de negocio (gate, solo el dueño)
**¿`usados-de-la-costa` (18 carros) es inventario PROPIO de Altorra o un aliado real?**
- Si PROPIO → §205 daña el SEO de casi todo el catálogo (fix urgente: marcar propios; o re-modelar tenencia). Además el "aliado" no debería ser el contenedor del inventario propio.
- Si ALIADO → Altorra no tiene inventario propio registrado; TODO-25 (comisiones/liquidación) es aún más urgente y la data de comisión no existe.

## Recomendación
1. Resolver la pregunta de negocio ↑ (define el fix de §205 y el modelo de TODO-25).
2. Tratar esto como evidencia para **TODO-33**: correr una **auditoría de reconciliación dedicada** (cerebro "✅" vs datos/realidad vivos) — NO confiar en marcas "hecho" sin verificación contra datos. Skill `auditoria-cerebro` + queries Firestore por subsistema.
3. Limpiar el doc basura `concesionarios/dfsfdfdfs`.
4. La restructura TODO-25 (tipoTenencia + autorizaciones + esquemaComisión) sigue siendo el fix estructural; el §205 actual es interim sobre un modelo incoherente.

## Meta-lección
Documentado "✅ hecho" (incluso verificado en CÓDIGO) ≠ correcto contra DATOS vivos. Para subsistemas con estado, la verificación de cierre debe incluir una mirada a los datos reales, no solo al código/doc (refuerza M-16/TODO-33). Lección portable.
