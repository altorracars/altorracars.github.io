# 📖 Manual del CRM Altorra — para el equipo (sin tecnicismos)

> **Versión 1.0** · 2026-06-09 · Cubre el portal CRM v0.4.1 (Bandeja · Pipeline · Agenda · Reportes · Contactos).
> **Acceso**: `altorracars.github.io/admin-app/dist/` → inicia sesión con tu cuenta del panel.
> ℹ️ El CRM evoluciona por sprints (plan §176): este manual se actualiza con cada mejora.
> Algunos nombres de estados/etapas cambiarán pronto — la versión vigente siempre es la de este archivo.

---

## 1. Las 5 palabras que tienes que conocer (con analogía de concesionario)

| Palabra | Qué es | Analogía |
|---|---|---|
| **Contacto** | Una PERSONA (nombre, teléfono, correo). Existe una sola vez aunque escriba 10 veces. | La ficha del cliente en tu archivador. |
| **Lead** | Un INTERÉS entrante: alguien preguntó por un carro, pidió cita, llenó un formulario. | Alguien que entró a la vitrina a mirar. |
| **Negocio (deal)** | Una VENTA EN CURSO: un lead que va en serio y estás trabajando para cerrar. | El cliente que ya está negociando un carro concreto. |
| **Actividad** | Cada cosa que pasa: una llamada, un WhatsApp, una nota, una cita. | Las anotaciones en la ficha del cliente. |
| **Cita** | Una actividad con fecha y hora (test drive, visita, peritaje). | La agenda de la oficina. |

**La regla de oro del CRM** 🥇: *la Bandeja es para FILTRAR lo que entra; el Pipeline es para CERRAR ventas.* Un interesado vive en la Bandeja. Cuando va en serio, lo conviertes en Negocio y desde ahí **solo se trabaja en el Pipeline**.

---

## 2. Tu rutina diaria en 5 pasos (15 minutos cada mañana)

1. **Abre la Bandeja** → botón **“📋 Pendientes hoy”**: ahí están tus llamadas y seguimientos de hoy (y los vencidos en rojo). Hazlos primero y márcalos **✓ Hecho**.
2. Mira la cola **“🔥 Calientes sin contestar”** — cada hora que pasa, el cliente se enfría (la tarjeta te muestra **⏱ cuántos minutos lleva sin contacto**: ámbar a los 45, rojo a los 60).
3. **Contacta** (WhatsApp 💬 o registra la llamada con 📞) → al terminar, el sistema te pregunta **“¿Próximo paso?”** — elige uno SIEMPRE (un tap): así nada se te olvida.
4. **Abre el Pipeline** → ¿algún negocio lleva días quieto? Llámalo hoy.
5. **Abre la Agenda** → ¿qué citas hay hoy? Confírmalas por WhatsApp en la mañana.

### ⚡ El botón más importante: “Lead rápido”
¿Te escribió alguien por WhatsApp? ¿Entró un cliente caminando al patio? ¿Te llamaron? **Regístralo en 30 segundos**: Bandeja → **⚡ Lead rápido** → nombre + teléfono + de dónde vino → lee la frase de autorización al cliente → ✓ → Registrar. Queda asignado a TI automáticamente. **Funciona incluso sin señal** (se sincroniza solo al volver la conexión).
> 🥇 Regla de la casa: **si no está en el CRM, no existe** — y los negocios que no estén registrados no entran a la liquidación de comisiones.

---

## 3. La Bandeja (donde entra TODO)

Cada interés que llega — formulario de la web, suscripción, lead que tú registres a mano — aparece aquí **solo**, ordenado por urgencia (el número dorado es el “score”: qué tan caliente está el cliente; más alto = atiéndelo primero).

### Las 4 colas de arriba
- **🔥 Calientes sin contestar** — alto interés y nadie le ha hablado. *PRIORIDAD #1.*
- **👤 Mis asignados** — los tuyos.
- **📥 Sin asignar** — sin dueño. Si está libre, ¡tómalo!
- **Todo** — todos los leads, incluso cerrados.

### Los estados de un lead (en orden natural)
| Estado | Significa | Cuándo lo pones |
|---|---|---|
| **Nuevo** | Acaba de entrar, nadie le ha hablado | (automático) |
| **Contactado** | Ya le escribiste/llamaste | Apenas le hables la primera vez |
| **Calificado** | Va en serio: tiene presupuesto e intención real | Cuando confirmes que puede y quiere comprar |
| **No calificado** | No es un comprador (spam, curioso, sin presupuesto) | Cuando lo confirmes — no lo borres, márcalo |
| **Convertido** | Lo pasaste a Negocio (Pipeline) | (lo pone el sistema al convertir) |
| **Perdido** | Se enfrió ANTES de ser negocio (no responde, compró en otro lado) | Tras varios intentos sin respuesta |

> ⚠️ **Regla importante**: si el lead ya está **Convertido**, NO le cambies más el estado en la Bandeja — su vida sigue en el Pipeline. Cambiárselo crea contradicciones (ej. “perdido” aquí y “negociación” allá). *(El sistema pronto lo bloqueará solo; mientras tanto, disciplina.)*

### Acciones por fila
- **WhatsApp** 💬 — abre chat con el cliente y deja registro.
- **Asignar asesor** 👤 — dale un dueño (todo lead debe tener UNO).
- **Cambiar estado** 🚩 — el dropdown de estados.
- **Convertir a negocio** ⊕ — cuando esté **Calificado** (ver §4).
- **Ver detalle** › — abre la ficha 360 del cliente.

### Registrar un lead a mano (“+ Nuevo lead”)
Para los que NO llegan por la web: llamadas, walk-ins, Instagram/Facebook, referidos. Llena nombre + teléfono (o correo), el canal de origen y si es orgánico o pauta (sirve para saber qué publicidad funciona). El sistema lo procesa igual que uno de la web.

---

## 4. Convertir: el momento clave

**¿Cuándo?** Cuando el cliente está **Calificado**: sabes que quiere un carro, puede pagarlo y está dispuesto a avanzar.

**¿Cómo?** Botón **Convertir a negocio** (en la fila de la Bandeja o en la ficha 360). El sistema crea el Negocio en el Pipeline (columna “Nuevo”) y marca el lead como Convertido.

**Después de convertir**: todo se trabaja en el **Pipeline**. La Bandeja queda como historial de ese lead.

---

## 5. El Pipeline (tus ventas en curso)

Columnas = etapas del proceso real de venta. Cada tarjeta es un negocio. **Arrástrala** a la etapa donde va (o usa el botón ↔ si prefieres menú):

**Nuevo → Contactado → Cita agendada → Visitó → Test drive → Negociación → Financiación → 🏆 Vendido**

- El % de cada etapa alimenta el **pronóstico** de ventas del mes (Reportes).
- **Editar monto** 💰: pon el precio real del carro que negocia — sin monto, el pronóstico queda cojo.
- **Marcar GANADO** 🏆 cuando firme/pague.
- **Marcar PERDIDO** ✖ si se cae — elige la **razón** (precio, financiación negada, compró en otro lado…). Esa razón vale oro: en Reportes te dice POR QUÉ se pierden ventas.

> ⚠️ No dejes negocios “zombies”: si lleva 2 semanas quieto, o lo reactivas o lo marcas perdido con su razón.

---

## 6. La Agenda (citas)

- **Agendar**: abre la ficha 360 del cliente → botón **Agendar cita** → fecha y hora.
- La vista de mes muestra las citas; clic en una cita → abre la ficha del cliente.
- 🔜 **En camino**: las citas que el cliente pide desde la web aparecerán aquí mismas, con botones Confirmar / Reprogramar / Cancelar (que avisan al cliente por correo automáticamente). Hoy esas citas web se gestionan todavía en el calendario del panel admin clásico.

---

## 7. Contactos (el directorio)

Todas las personas: **Leads**, **Clientes** y **Suscriptores** (newsletter). Busca por nombre, correo o teléfono. Clic en una persona → su **ficha 360**:
- **Resumen** — datos y vehículo de interés.
- **Timeline** — todo lo que ha pasado con esta persona.
- **Score** — desglose de qué tan caliente está.
- **Notas** — apuntes internos del equipo (escribe todo lo importante: “prefiere SUV blanco, llamar después de las 6pm”).

---

## 8. Reportes (cómo va el negocio)

KPIs del período, embudo (cuántos entran vs cuántos compran), ventas por canal (¿Instagram trae más que la web?), razones de pérdida y pronóstico ponderado. Botón **Actualizar** para refrescar y **CSV** para Excel.

---

## 9. Errores comunes (y cómo corregirlos)

| Error | Corrección |
|---|---|
| Cambiar el estado de un lead **Convertido** en la Bandeja | Ya no se puede (el sistema lo bloquea): su vida sigue en el Pipeline. |
| Borrar un cliente real | **No se borra: se ARCHIVA** (menú ⋯ → 🗄 Archivar — reversible, sale de todas las vistas y de Reportes). **🗑 Eliminar definitivo** es SOLO para pruebas/spam, solo lo puede el Super Admin, y borra TODO el rastro (no hay vuelta atrás). |
| Lead sin asesor asignado | Asígnalo apenas entre — un lead sin dueño es un lead que nadie atiende. |
| Negocio sin monto | Edita el monto apenas sepas el carro que negocia. |
| Marcar Perdido sin razón | La razón es lo que te enseña a vender más. Elígela siempre. |
| Trabajar al cliente por fuera (WhatsApp personal, sin registro) | Usa los botones del CRM: lo que no queda registrado, no existe para el equipo. |

---

## 10. Glosario rápido

**Score** = número 0-100 de qué tan caliente está el lead (lo calcula el sistema solo). · **SLA** = tiempo máximo para responder sin que se enfríe. · **Canal** = por dónde llegó (web, Instagram, llamada…). · **Orgánico vs Pauta** = ¿llegó solo o por publicidad pagada? · **NBA (próx. acción)** = sugerencia del sistema de qué hacer ahora con ese lead. · **360** = la ficha completa de la persona.

---

> 🧭 **Si solo recuerdas 3 cosas**: (1) Calientes sin contestar PRIMERO, (2) todo lead con dueño y estado al día, (3) convertiste = se trabaja en Pipeline, no en Bandeja.
