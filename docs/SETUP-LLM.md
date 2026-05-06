# 🤖 Setup del Cerebro Altorra AI (Bot ALTOR con LLM)

> Guía paso a paso para activar la integración con Claude (Anthropic) cuando
> tengas presupuesto disponible. **No urgente** — el bot funciona perfecto
> con rule-based mientras tanto.
>
> Ultima actualización: 2026-05-06
> Entorno target: **Windows 10/11** (PowerShell o Git Bash)
> Ruta del repo: `C:\Users\romad\Documents\GitHub\altorracars.github.io`

---

## Estado actual del proyecto

✅ **Lo que YA está implementado** (todo el código deployado a GitHub Pages):

- Cloud Function `chatLLM` (callable que conecta el Concierge con un LLM)
- Cloud Function `summarizeChat` (resumen automático cada 10 turnos)
- Cloud Function `onConciergeMessageAdded` (trigger del summarize)
- Cloud Function `proactiveEngagement` (mensajes proactivos cada 5 min)
- Schema `knowledgeBase/_brain` (singleton con identidad, contexto, instrucciones)
- Admin UI "Cerebro Altorra AI" con 6 tabs (Identidad, Contexto, Instrucciones, FAQs, Reglas, Modelo LLM)
- Provider abstraction (Anthropic / OpenAI / Google)
- Rate limit per-sessión (60 calls/día)
- Fallback rule-based si LLM no está disponible

⏸️ **Lo que NO se ejecutó** (queda pendiente cuando tengas presupuesto):

- Setear el secret `LLM_API_KEY` en Firebase Functions
- `firebase deploy --only functions` (las 4 nuevas Cloud Functions)
- `firebase deploy --only firestore:rules` (nueva colección `llmRateLimit`)
- Activar el toggle "Cerebro AI activo" en el admin

> **Importante**: el bot ALTOR sigue funcionando NORMAL sin esto. El código
> tiene fallback automático: cuando falta `LLM_API_KEY` o el `_brain.enabled = false`,
> usa el motor rule-based local (intent classifier + KB + sentiment + NER).
> Cero downtime, cero gasto.

---

## 💰 Costos estimados (cuando lo actives)

Modelo recomendado: `claude-haiku-4-5` (más barato, calidad alta).

| Volumen mensual | Costo API estimado |
|---|---|
| 100 conversaciones | ~$0.30 USD |
| 1,000 conversaciones | ~$3 USD |
| 5,000 conversaciones | ~$15 USD |
| 10,000 conversaciones | ~$30 USD |

**Recomendación de inicio**: cargar **$5 USD** y activar auto-recarga en
Anthropic Console. Para el tráfico actual de Altorra Cars, alcanza para meses.

> **Importante**: el plan Pro/Max de claude.ai (chatbot consumer) NO se puede
> usar para esto. La API de Anthropic se factura aparte (pay-per-token).

---

## 📋 Pre-requisitos en tu Windows

Antes de empezar, asegurate de tener instalado:

### 1. Node.js (LTS recomendado)

Verificá si lo tenés. Abrí **PowerShell** (Win+R → escribí `powershell` → Enter):

```powershell
node --version
```

- Si te muestra una versión (ej. `v20.10.0`) ✅ ya lo tenés.
- Si dice "not recognized" ❌ instalalo:
  - Andá a https://nodejs.org/
  - Descargá la versión **LTS** (la verde, izquierda).
  - Ejecutá el instalador (Next, Next, Finish — dejá los defaults).
  - Cerrá y abrí de nuevo PowerShell. Verificá con `node --version`.

### 2. npm (viene con Node.js automáticamente)

```powershell
npm --version
```

Debe mostrar algo tipo `10.2.4`. Si funciona, listo.

### 3. Git (probablemente ya lo tenés)

```powershell
git --version
```

Si no lo tenés, https://git-scm.com/download/win.

---

## 🚀 Setup completo — los 8 pasos

### Paso 1 — Instalar Firebase CLI globalmente

En PowerShell:

```powershell
npm install -g firebase-tools
```

Tarda 1-2 min. Al terminar, verificá:

```powershell
firebase --version
```

Debe mostrar algo tipo `13.x.x`. Si funciona, listo.

> **Si te da error de permisos** ("EACCES" o "EPERM"): cerrá PowerShell, abrí
> una **nueva ventana como Administrador** (botón derecho sobre PowerShell → "Ejecutar como administrador") y repetí el `npm install -g firebase-tools`.

### Paso 2 — Login en Firebase

```powershell
firebase login
```

Esto abre tu navegador. Iniciá sesión con la **cuenta de Google que es dueña**
del proyecto Firebase de Altorra Cars (la que tiene acceso al proyecto
`altorra-cars`). Te pedirá permisos → "Allow".

Vuelve a PowerShell — debería decir `✔ Success! Logged in as ...`

Verificá que ves el proyecto:

```powershell
firebase projects:list
```

Debe aparecer `altorra-cars` en la lista.

### Paso 3 — Ir a la carpeta del repo

```powershell
cd C:\Users\romad\Documents\GitHub\altorracars.github.io
```

Verificá que estás en el lugar correcto:

```powershell
ls firebase.json
```

Debe mostrar el archivo. Si no lo encuentra, revisá la ruta.

### Paso 4 — Obtener tu API key de Anthropic

1. Andá a https://console.anthropic.com/
2. **Crear cuenta** o iniciar sesión.
3. Cuando te pregunte el tipo de cuenta → **Individual** (recomendado para 1 dueño).
4. **Settings → Plans & Billing → Add Credits → mínimo $5 USD**
   (Anthropic NO da saldo gratis).
5. **Settings → API Keys → "+ Create Key"** → nombre `altorra-cars-prod` → Create.
6. **🚨 IMPORTANTE**: copiá la key INMEDIATAMENTE (empieza con `sk-ant-api03-...`).
   Solo se muestra una vez. Pegala en un Notepad temporal.

### Paso 5 — Configurar el secret en Firebase

En PowerShell, dentro de la carpeta del repo:

```powershell
firebase functions:secrets:set LLM_API_KEY
```

Te va a pedir `Enter a value for LLM_API_KEY:` — **pegá tu key de Anthropic
y dale Enter**.

Verificá que se guardó bien:

```powershell
firebase functions:secrets:access LLM_API_KEY
```

Debe mostrarte la key completa. Si dice "secret not found", repetí el comando
`:set`.

### Paso 6 — Deploy de las Cloud Functions

Esto sube las 4 nuevas funciones a Firebase (chatLLM, summarizeChat,
onConciergeMessageAdded, proactiveEngagement) además de las existentes.

```powershell
firebase deploy --only functions
```

Tarda 3-5 minutos. Al final debería decir `✔ Deploy complete!`.

> **Si falla `proactiveEngagement` con error de Cloud Scheduler**:
> 1. Andá a https://console.cloud.google.com/apis/library/cloudscheduler.googleapis.com?project=altorra-cars
> 2. Click **"Habilitar"**
> 3. Volvé a correr `firebase deploy --only functions`

> **Si falla por "billing"**: es porque Cloud Functions Gen 2 requiere el plan
> Blaze (pay-as-you-go) en Firebase. Tu proyecto Altorra ya lo tiene activo
> (las Cloud Functions existentes funcionan), así que no debería ser problema.

### Paso 7 — Deploy de Firestore Rules

Esto activa la nueva colección `llmRateLimit/{sessionId}` (rate limiting).

```powershell
firebase deploy --only firestore:rules
```

Tarda 30 segundos. Debe decir `✔ Deploy complete!`.

### Paso 8 — Activar el Cerebro en el admin

1. Andá a https://altorracars.github.io/admin.html (login como super_admin).
2. Sidebar izquierda → **Cerebro Altorra AI**.
3. Tab **"Modelo LLM"** (la 6ª).
4. **Marcá el checkbox "Cerebro AI activo"**.
5. Confirmá:
   - **Proveedor LLM**: `Anthropic Claude (recomendado)` ✅
   - **Modelo**: `claude-haiku-4-5` ✅
   - **Temperatura**: `0.7`
   - **Max tokens**: `600`
6. Click **"Guardar cambios"** (botón dorado abajo).
7. La pildora arriba a la derecha debe pasar de **"Sin configurar"** → **"Activo · claude-haiku-4-5"** ✅

### Bonus — Configurar identidad/contexto antes de probar

Pasate por las otras tabs y completalas:

- **Identidad**: nombre `ALTOR`, tono y personalidad por default ya están bien.
- **Contexto**: descripción del negocio (ya tiene defaults sensatos pero podés ajustar).
- **Instrucciones**: el system prompt principal. Por default tiene un buen punto de partida.
- **Reglas Seguridad**: las reglas inviolables (ya vienen con 6 reglas por default).

Recordá hacer click "Guardar cambios" después de cada cambio.

---

## ✅ Probar que funciona

1. Abrí una pestaña **incógnito** (Ctrl+Shift+N).
2. Andá a https://altorracars.github.io/.
3. Click el FAB de ALTOR (abajo derecha).
4. Completá el Lead Capture Gate (si no estás logueado).
5. Escribí algo en lenguaje natural:
   - "Hola, qué tal?"
   - "Tienen algún Mazda usado bajo 60 millones?"
   - "Me explicas los pasos para financiar?"
6. **Mirás 3 puntitos animados** (typing indicator) → respuesta del LLM real
   con conocimiento de tu inventario en tiempo real.

Si las respuestas son fluidas, naturales, y mencionan vehículos REALES de tu
inventario (no inventados): **funciona** 🎉.

---

## 🆘 Troubleshooting

### "Sigue respondiendo con reglas viejas"

- Hard refresh: `Ctrl+Shift+R` en la página.
- Verificá en F12 (DevTools → Console) si dice `[Concierge] Chat LLM provider not registered` (significa que `window.functions` no se cargó). Si aparece, recargá.

### "noKey: true" en respuesta

```powershell
firebase functions:secrets:access LLM_API_KEY
```

Si NO muestra la key → repetí el `:set`. Después redeploy:

```powershell
firebase deploy --only functions:chatLLM
```

### "disabled: true" en respuesta

El toggle "Cerebro AI activo" no está marcado. Andá al admin → Cerebro AI →
tab Modelo LLM → marcalo y Guardar.

### Error 401 en logs de Anthropic

```powershell
firebase functions:log --only chatLLM
```

Si ves "401 Unauthorized": tu API key es inválida o se quedó sin saldo.
Verificá saldo en https://console.anthropic.com/settings/billing.

### Rate limit excedido

60 calls/día/sesión es el cap. Si lo excedís:
- Esperar al día siguiente, o
- Cambiá el `RATE_LIMIT_PER_DAY` en `functions/index.js` y redeploy.

### `proactiveEngagement` no dispara mensajes

```powershell
gcloud services enable cloudscheduler.googleapis.com --project=altorra-cars
firebase deploy --only functions:proactiveEngagement
```

> Si NO tenés `gcloud` instalado, andá manualmente a:
> https://console.cloud.google.com/apis/library/cloudscheduler.googleapis.com?project=altorra-cars
> y click "Habilitar".

---

## 📊 Comandos útiles para el día a día

```powershell
# Ver logs de la función LLM (debugging en vivo)
firebase functions:log --only chatLLM

# Ver logs del summarize automático
firebase functions:log --only summarizeChat

# Ver logs del proactive engine
firebase functions:log --only proactiveEngagement

# Ver TODOS los logs (de todas las functions)
firebase functions:log

# Listar todos los secrets configurados
firebase functions:secrets:access

# Cambiar el modelo (sin redeploy — se hace en admin → Cerebro AI → tab Modelo)
# Solo el secret y el deploy son one-time. Los toggles del Cerebro son
# realtime via Firestore.

# Re-deploy SOLO una función específica (más rápido que deployar todo)
firebase deploy --only functions:chatLLM
```

---

## 💡 Tips de optimización de costos

Cuando lo actives, monitorea:

1. **Usar `claude-haiku-4-5`** (default) — el más barato.
2. **Conversation Summary YA está activo** — comprime chats largos cuando
   alcanzan 10 turnos, reduce tokens ~70% en chats extensos.
3. **Rate limit de 60 calls/día/sesión** ya está protegiendo costos.
4. **Auto-recarga en Anthropic** — Settings → Plans & Billing → Auto Reload.
   Cargá $X cuando baje de $Y. Nunca te quedás sin saldo.
5. **Monitor de uso** en https://console.anthropic.com/settings/usage —
   gráfico diario de tokens consumidos.

---

## 🔄 Cuando vuelvas a este tema

**Resumen express si solo querés activar todo otra vez**:

```powershell
cd C:\Users\romad\Documents\GitHub\altorracars.github.io
firebase login
firebase functions:secrets:set LLM_API_KEY  # pegá tu key
firebase deploy --only functions
firebase deploy --only firestore:rules
```

Después → admin → Cerebro AI → marcar "Activo" → Guardar.

**Listo en 10 minutos.**

---

## 📝 Resumen — Estado pendiente

- [ ] Crear cuenta en Anthropic Console (si no la tenés)
- [ ] Cargar saldo $5 USD inicial
- [ ] Crear API key
- [ ] Instalar Firebase CLI (`npm install -g firebase-tools`)
- [ ] `firebase login`
- [ ] `firebase functions:secrets:set LLM_API_KEY`
- [ ] `firebase deploy --only functions`
- [ ] `firebase deploy --only firestore:rules`
- [ ] Marcar "Cerebro AI activo" en admin
- [ ] Probar el chat

**Mientras tanto: el bot funciona con rule-based.** Sin downtime.
