# 🚀 PLAN MAESTRO ALTORRA — Migración + Crecimiento Web

> **Cliente**: ALTORRA Company SAS (Cartagena, Colombia)
> **Web actual**: altorracars.github.io
> **Empezamos**: Jueves <!-- el cliente confirma fecha exacta -->
> **Documentado por**: Claude (agente de desarrollo + marketing)
> **Última actualización**: 2026-05-11

---

## 📖 Sobre este documento

Este es **TU plan de acción**. Lo abrís cualquier día y sabés qué hacer, cuánto cuesta y cuánto tarda.

**Importante**: vos NO necesitás saber código. Yo me encargo de todo lo técnico. Solo necesitás:
- ✅ Tomar decisiones (con mi recomendación)
- ✅ Hacer compras pequeñas (dominio, etc.)
- ✅ Aprobar cambios cuando te pregunte
- ✅ Probar lo que te muestro

Cualquier duda, me la decís en lenguaje normal. Yo traduzco.

---

## 🎯 ¿Qué vamos a lograr?

| Hoy | Después del plan |
|---|---|
| Cliente entra y la web carga en 2-4 segundos | ⚡ **0.5-1 segundo** (4x más rápido) |
| Push de cambios = 5-15 minutos hasta ver online | 🚀 **45-90 segundos** |
| URL `altorracars.github.io` (poco profesional) | 🌐 **altorracars.com** (profesional) |
| Email `@gmail.com` | 📧 **@altorracars.com** |
| Google no muestra fotos+precios en búsqueda | 🔍 **Rich snippets** (con foto y precio) |
| 50-150 visitas/mes orgánicas estimado | 📈 **500-2000+ visitas/mes** (con SEO) |
| Cero analytics avanzado | 📊 **Heatmaps + session recordings gratis** |
| 0 leads de Google Ads | 💰 **5-15 leads/mes** desde anuncios |

---

## 🗓️ Cronograma sugerido (4 semanas)

| Semana | Foco | Tu inversión | Tu tiempo |
|---|---|---|---|
| **Semana 1** (jueves+) | Dominio + Cloudflare DNS + Email pro | $10 USD/año dominio | 1-2 horas |
| **Semana 2** | Migración a Cloudflare Pages | $0 | 30 min (aprobaciones) |
| **Semana 3** | Optimización fotos + SEO técnico | $0 | 1 hora (revisar) |
| **Semana 4** | Schema + Google Business Profile + Analytics | $0 | 2-3 horas |

**Post-plan (ongoing)**:
- Mes 2+: Fotos profesionales + blog SEO (a tu ritmo)
- Mes 3+: Marketing pagado (cuando tengas presupuesto)

---

## ⚙️ Pre-requisitos antes del jueves

Tené listo (no me los pases, son tuyos):

1. ✅ **Tarjeta de crédito/débito** (para Hostinger, $10)
2. ✅ **Cuenta de Gmail activa** (la que usás para Altorra)
3. ✅ **Acceso a Firebase Console** (para confirmar nada se rompe)
4. ✅ **Login de GitHub** (donde está el código)
5. ✅ **Decisión del nombre del dominio**: `altorracars.com` o `altorracars.com.co` (recomiendo `.com` — más universal, mejor SEO)

Eso es TODO. No necesitás más.

---

# 📋 FASE 1 — Semana 1: Fundamentos ($10/año, 2 horas)

## 1.1 — Comprar el dominio (Jueves, 15 min)

**Tu tarea**:
1. Entrá a https://hostinger.com (donde siempre comprás dominios)
2. Buscá `altorracars.com`
3. Si está disponible, comprá por 1 año mínimo (después se renueva auto)
4. **NO compres email de Hostinger** (lo hacemos gratis con Cloudflare)
5. **NO compres hosting de Hostinger** (no lo necesitamos)
6. Una vez comprado, **mandame por privado o WhatsApp**: "compré altorracars.com"

**Mi tarea**:
- Confirmar que el dominio está activo
- Te paso los siguientes pasos

**Costo**: ~$10-15 USD/año (depende de promoción Hostinger)

---

## 1.2 — Crear cuenta Cloudflare gratis (Jueves, 5 min)

**Tu tarea**:
1. Entrá a https://cloudflare.com
2. Click "Sign Up" → crea cuenta con tu Gmail
3. **NO te pidan tarjeta** — es plan gratuito
4. Click "Add a Site" → pegá `altorracars.com`
5. Elegí **Plan Free** ($0/mes)
6. Cloudflare te muestra una pantalla con 2 "nameservers" parecidos a esto:
   ```
   lara.ns.cloudflare.com
   xavier.ns.cloudflare.com
   ```
   (los nombres varían)
7. **Anota esos 2 nameservers** o dejá la pestaña abierta
8. Avisame: "ya tengo los nameservers"

**Mi tarea**:
- Te paso pasos exactos para cambiar los nameservers en Hostinger

---

## 1.3 — Apuntar Hostinger a Cloudflare (Jueves, 10 min)

**Tu tarea** (yo te guío paso a paso):
1. Entrar a panel Hostinger → Mis dominios
2. Click en `altorracars.com` → DNS / Nameservers
3. Cambiar de "Hostinger Default" → "Custom Nameservers"
4. Pegá los 2 nameservers que te dio Cloudflare
5. Guardar

**Tiempo de propagación**: 15 minutos a 2 horas (raramente más).

**Cómo sé que funcionó**: Cloudflare te manda un email diciendo "Your domain is active on Cloudflare".

**Mi tarea**:
- Esperar la confirmación
- Configurar el DNS de Cloudflare para apuntar a GitHub Pages
- Verificar que la web carga en `altorracars.com`

---

## 1.4 — Activar HTTPS automático (Yo, 5 min)

**Mi tarea** (vos no haces nada):
- En Cloudflare → SSL/TLS → Full
- Activar "Always Use HTTPS"
- Activar "Automatic HTTPS Rewrites"

**Resultado**: tu web tiene candado verde y `https://altorracars.com` funciona.

---

## 1.5 — Email profesional gratis (Jueves o viernes, 30 min)

**Mi tarea**:
- Configurar Cloudflare Email Routing
- Crear `[email protected]`, `[email protected]`, `[email protected]`
- Configurar que TODO se redirija a tu Gmail real

**Tu tarea**:
- Confirmar tu Gmail (te llega un email de verificación de Cloudflare)
- Probar mandándote vos mismo un mensaje a `[email protected]` → te debe llegar al Gmail

**Costo**: $0 para siempre. Hasta 200 redirecciones diarias gratis.

---

## 1.6 — Configurar Firebase Auth para nuevo dominio (Yo, 5 min)

**Importante** (sino el login se rompe):
- En Firebase Console → Authentication → Settings → Authorized domains
- Agregar `altorracars.com` y `www.altorracars.com`

**Tu tarea**: aprobarme acceso si te pide login.

---

## ✅ Resultado de Fase 1

Al final de la semana 1 vas a tener:
- ✅ `altorracars.com` funcionando (sin `altorracars.github.io`)
- ✅ HTTPS + candado verde
- ✅ Velocidad 5-10x mejor (Cloudflare CDN global)
- ✅ Emails `@altorracars.com` (3-5 cuentas)
- ✅ Todo gratis excepto $10/año del dominio

**Limitación**: el deploy SIGUE tardando 5-15 min porque seguimos en GitHub Pages.

---

# 📋 FASE 2 — Semana 2: Migración a Cloudflare Pages ($0, 3-5 días de mi trabajo)

**ESTO ES LO QUE RESUELVE TU PROBLEMA DEL DEPLOY LENTO.**

## 2.1 — Crear cuenta de Cloudflare Pages (Lunes semana 2, 10 min)

**Tu tarea**:
1. En Cloudflare Dashboard → click izquierdo → "Workers & Pages"
2. Click "Create application" → "Pages" → "Connect to Git"
3. Conectar tu cuenta de GitHub (autoriza acceso al repo `altorracars/altorracars.github.io`)
4. Click "Begin setup"
5. **STOP** — esperá a que yo configure el resto

**Mi tarea**:
- Crear el archivo de configuración del build
- Setear las variables de entorno (claves Firebase, Anthropic, Telegram)
- Configurar `altorracars.com` para que apunte a Cloudflare Pages

---

## 2.2 — Refactor del proyecto con Vite (Yo, 2-3 días)

**Sin entrar en detalle técnico**, voy a:
- Reorganizar el código del proyecto para que use un "build system" moderno
- Cada archivo va a tener un nombre único con hash (ej: `style-abc123.css` en lugar de `style.css`)
- Esto hace que el navegador SIEMPRE descargue la última versión sin necesidad de avisarle al usuario
- **Adiós para siempre al cartel "Nueva versión disponible"** (todo el trabajo de §82+§83+§84 ya no se necesita más)

**Tu tarea durante este tiempo**:
- Nada. Yo trabajo en una branch separada.
- Cuando esté listo, te aviso y te paso un link de preview para que pruebes ANTES de que esté en producción.

---

## 2.3 — Testing E2E (Yo + vos, 1 día)

**Mi tarea**:
- Listar TODOS los flujos críticos a probar:
  - Login de admin
  - Login de cliente
  - Crear vehículo desde admin
  - Subir foto de vehículo
  - Formulario de contacto
  - Bot ALTOR completo
  - Telegram alerts
  - WhatsApp redirects
  - Favoritos
  - Búsqueda
  - Filtros
  - Calendario
  - Notificaciones push

**Tu tarea**:
- Probar cada flujo en el preview que te paso
- Marcar cualquier cosa rara
- Si todo OK → aprobar el switch a producción

---

## 2.4 — Switch a producción (Yo, 5 min)

**Mi tarea**:
- En Cloudflare → "Promote to production"
- En 30 segundos, `altorracars.com` está usando la nueva versión
- Si algo sale mal, rollback con 1 click (te asusto pero no es realista, ya está testeado)

**Tu tarea**:
- Confirmar que ves los cambios en tu navegador
- Hacer un par de pruebas finales

---

## ✅ Resultado de Fase 2

- ✅ Deploy en **45-90 segundos** (de 5-15 min antes)
- ✅ **Adiós sistema de aviso de actualizaciones** (ya no se necesita)
- ✅ Web carga **3-5x más rápido** (assets cacheados forever con hash)
- ✅ Deploy previews por cada cambio (podés ver antes de aprobar)
- ✅ Bandwidth **ilimitado** (Cloudflare Pages no tiene límite)
- ✅ Tu inversión: **$0** (sigue siendo gratis)

---

# 📋 FASE 3 — Semana 3: Optimización performance ($0, 2-3 días de mi trabajo)

## 3.1 — Optimización de fotos

**Mi tarea**:
- Tomar las fotos actuales de vehículos
- Convertir a **WebP** (formato moderno, 50% más liviano que JPG)
- Crear versión **AVIF** (formato nuevo, 70% más liviano)
- El navegador elige automáticamente el formato que soporta

**Tu tarea**: nada.

**Resultado**: fotos cargan 3-5x más rápido. Móviles especialmente felices (menos datos consumidos).

---

## 3.2 — Lazy loading inteligente

**Mi tarea**:
- Las imágenes solo se cargan cuando el usuario hace scroll cerca de ellas
- "Skeleton loaders" mientras cargan (placeholders animados)
- Hoy esto ya está parcial — lo pulo

---

## 3.3 — Code splitting

**Mi tarea**:
- Hoy todo el JavaScript se carga al inicio (~500KB)
- Mañana: solo lo necesario para la página actual (~150KB)
- Resto se carga en background mientras el user navega

**Resultado**: primera página visible en **0.5 seg en lugar de 2 seg**.

---

## 3.4 — Critical CSS inline

**Mi tarea**:
- El CSS crítico (lo que se ve arriba al cargar) va inline en el HTML
- El resto se carga async
- Adiós al "FOUC" (flash of unstyled content)

---

## ✅ Resultado de Fase 3

- ✅ Lighthouse score (la nota de Google): **70-80** → **95-100**
- ✅ First Contentful Paint: **2s** → **0.5s**
- ✅ Mobile users mucho más felices
- ✅ Google va a rankear mejor (page speed es factor SEO importante)

---

# 📋 FASE 4 — Semana 4: SEO + Visibilidad ($0, 3-5 días de mi trabajo)

## 4.1 — Schema.org JSON-LD por vehículo

**Qué es**: código invisible que le dice a Google "esta página tiene un AUTO con estas características".

**Mi tarea**:
- Agregar JSON-LD en cada ficha de vehículo
- Marca, modelo, año, kilometraje, precio, color, transmisión, combustible

**Resultado**: Google muestra tus autos con **rich snippets** (foto + precio + año) en los resultados de búsqueda.

Ejemplo de cómo se va a ver en Google:
```
Toyota Hilux 2020 - Altorra Cars Cartagena
🚗 $80.000.000 COP
⭐⭐⭐⭐⭐ (5)
📍 Cartagena, Colombia
45.000 km · Automática · Diesel
```

(vs lo de hoy que es solo texto plano)

---

## 4.2 — Open Graph + Twitter Cards

**Qué es**: cuando alguien comparte el link de un auto en WhatsApp/Facebook/Twitter, se ve una preview lindo con foto + título + precio.

**Mi tarea**: agregar meta tags por cada vehículo.

**Resultado**: clicks 5x más cuando se comparte un auto.

---

## 4.3 — Google Search Console + Bing Webmaster

**Mi tarea**:
- Registrar `altorracars.com` en Google Search Console
- Subir sitemap
- Submit a indexación

**Tu tarea**:
- Verificar dominio (te paso código, lo pegás en Cloudflare DNS — 5 min)

**Resultado**: empezás a ver datos reales: qué busca la gente, dónde te ven, qué clickean.

---

## 4.4 — Google Business Profile (Maps)

**Tu tarea**:
1. Entrar a https://business.google.com
2. Crear perfil "Altorra Cars" con:
   - Dirección del lote
   - Teléfono
   - Horario
   - Categoría: "Concesionario de autos usados"
   - 5-10 fotos del lote y autos
   - Link a `altorracars.com`
3. Verificar (Google te manda postal o llamada, dependiendo)

**Mi tarea**:
- Integrar el widget de reviews de Google en la web
- Agregar mapa interactivo en página Contacto

**Resultado**: cuando alguien busca "carros usados Cartagena", **salís en el TOP 3 con mapa, fotos y reviews**.

---

## 4.5 — Local SEO Cartagena

**Mi tarea**:
- Optimizar todas las páginas para keywords locales
- "venta de autos Cartagena", "concesionario usados Cartagena", "comprar carro Cartagena"
- Crear página dedicada `/cartagena` con info local

---

## ✅ Resultado de Fase 4

- ✅ Tus autos en Google Search con foto+precio visible
- ✅ Visibilidad orgánica: **5-10x más visitas** en 2-3 meses
- ✅ Google Business Profile activo (apareciendo en Maps)
- ✅ Sin pagar publicidad: clientes orgánicos llegando

---

# 📋 FASE 5 — Mes 2+: Contenido ($30-50 por auto, ongoing)

## 5.1 — Fotos profesionales

**Tu inversión**:
- Contratar fotógrafo local (consultar en Cartagena, $30-50 por sesión)
- O comprar drone básico ($300 una vez) + tripode + caja de luz

**Recomendación de fotos por auto**:
- 5 fotos exteriores (frente, lados, trasera, ¾)
- 3 fotos drone (vista aérea)
- 5 fotos interior (asientos, dashboard, pantalla, volante, baúl)
- 3 fotos motor + detalles importantes
- 2 fotos del kilometraje y documentos
- **Total: 18-20 fotos por auto** (vs 4-5 actuales)

---

## 5.2 — Videos cortos por auto (Reels)

**Tu tarea o tarea de fotógrafo**:
- Video 30-60 segundos
- 360° exterior
- Interior recorrido
- Arranque + sonido motor
- Detalle de equipamiento especial
- Subir a YouTube (no contado contra storage) + embed en ficha

**Resultado**: tasa de conversión sube 2-3x cuando el cliente VE el auto en video.

---

## 5.3 — Descripciones únicas con IA

**Mi tarea**:
- Crear sistema en admin: click "Generar descripción" → Claude escribe descripción única por auto
- Tono "asesor humano colombiano"
- Destacar pros + contras honestos
- Listo en 2 segundos por auto

**Tu inversión adicional**: ~$0.05 por descripción generada (~$5 al mes por 100 autos).

---

## 5.4 — Blog SEO

**Mi tarea**:
- Crear sección `/blog` en la web
- Plantilla de posts

**Tu tarea**:
- Decidir 4-8 temas que te interesen escribir o que sepas que la gente busca:
  - "Cómo elegir tu primer auto usado en Cartagena"
  - "Toyota Hilux vs Mitsubishi L200: cuál conviene"
  - "Diferencia entre transmisión automática y manual"
  - "Qué revisar antes de comprar un auto usado"
  - "Financiación de autos en Cartagena: opciones"
- Cada post: 800-1500 palabras

**Opción**: si no tenés tiempo, contratás un copywriter freelance ($20-40 por post) o me decís y yo te genero borradores con IA + vos los revisás y publicás.

**Resultado**: cada post atrae **100-1000 visitantes/mes** orgánicos a largo plazo.

---

# 📋 FASE 6 — Mes 3+: Marketing pagado ($100-500/mes según presupuesto)

## 6.1 — Google Ads ($150-300/mes recomendado para empezar)

**Mi tarea**:
- Setup completo de Google Ads
- Crear 3-5 campañas:
  - "Comprar carro usado Cartagena" (búsquedas exactas)
  - "Toyota Hilux Cartagena" + otros modelos específicos
  - Remarketing (visitantes que NO compraron)
- Configurar conversion tracking
- Optimización continua

**Tu inversión**: pagás directamente a Google con tarjeta. Empezás con $5-10 USD por día para probar.

**ROI esperado**: 1 venta de cada 20-50 leads = ROI 5-10x si los autos van entre $40-100M COP.

---

## 6.2 — Facebook + Instagram Ads ($100-200/mes)

**Mi tarea**:
- Crear Business Manager si no lo tenés
- Setup pixel de Facebook en la web
- Crear audiencias:
  - Hombres 25-55, Cartagena + 50km radio
  - Interés en autos
  - Visitantes recientes de la web (remarketing)
- Crear creatividades con las fotos+videos del Fase 5

---

## 6.3 — TikTok Ads ($50-100/mes, opcional)

**Cuándo conviene**: si querés clientes 25-35 años. Funciona bien para Reels de los autos.

---

## 6.4 — Remarketing inteligente

**Mi tarea**:
- Cliente vió `toyota-hilux-2020.html` pero no contactó
- Durante 7 días, Facebook le muestra publicidad de **ese mismo auto**
- Conversión 5-10x más alta que ads genéricos

---

# 📋 FASE 7 — Ongoing: Análisis y conversión ($0-50/mes)

## 7.1 — Microsoft Clarity (gratis, ilimitado)

**Mi tarea**: instalar en la web.

**Tu tarea**: ver una vez por semana:
- **Heatmaps**: dónde clickea la gente, dónde se traba
- **Session recordings**: ver la pantalla de usuarios reales navegando
- **Frustration signals**: clicks rabia, scrolls rápidos

**Resultado**: descubrís problemas que NUNCA hubieras visto. "Por qué el botón de contactar no funciona en mobile? Ah, está debajo del fold."

---

## 7.2 — Email marketing (Brevo gratis hasta 9k emails/mes)

**Mi tarea**:
- Setup Brevo o Mailchimp
- Form de "Suscribirse al newsletter" en la web
- Plantilla "Top 10 autos esta semana"
- Automatización: si cliente miró un auto → email 3 días después con autos similares

**Tu inversión**: $0 hasta 9k emails/mes. Después $15-25/mes según volumen.

---

## 7.3 — A/B testing

**Mi tarea**:
- Setup en Cloudflare Pages (incluido gratis)
- Probar variaciones:
  - Botón "Contactar" rojo vs verde
  - Precio destacado grande vs sutil
  - Foto principal del auto vs interior
- Cloudflare elige cuál convierte más después de 2 semanas

---

# 📋 FASE 8 — Cuando crezca: Profesionalización ($50-200/mes)

## 8.1 — WhatsApp Business API ($30-80/mes vía Twilio o 360dialog)

**Cuándo**: cuando manejes 50+ chats/día.

**Mi tarea**:
- Migrar del WhatsApp normal al API
- Catálogo de WhatsApp con todos los autos
- Respuestas automáticas con IA (similar al bot ALTOR)
- Plantillas pre-aprobadas

---

## 8.2 — CRM profesional (HubSpot Free → Pro $45/mes)

**Cuándo**: cuando tu admin actual no alcance.

**Mi tarea**: migrar leads del sistema actual a HubSpot.

---

## 8.3 — Calendly Pro o Cal.com ($0-10/mes)

**Mi tarea**: integrar reserva de visitas online.

---

# 💰 Resumen total de inversión esperada

## Año 1

| Categoría | Costo |
|---|---|
| Dominio Hostinger | $10 USD |
| Cloudflare Pages | $0 |
| Cloudflare DNS + Email + CDN | $0 |
| Firebase (sigue gratis para tu escala) | $0 |
| Anthropic Claude API (bot ALTOR) | $24-60 USD ($2-5/mes) |
| Fotos profesionales (50 autos a $30) | $1.500 USD |
| Google Ads (9 meses × $200) | $1.800 USD |
| Facebook Ads (9 meses × $100) | $900 USD |
| **TOTAL año 1** | **~$4.250 USD** (~$355/mes) |

## Año 2+ (estable)

| Categoría | Costo mensual |
|---|---|
| Dominio (anual prorrateado) | $1 |
| Hosting + CDN | $0 |
| Bot ALTOR | $2-5 |
| Google Ads | $200-400 |
| Facebook Ads | $100-200 |
| Fotos nuevos autos | $300-600 ($30 × 10-20 autos/mes) |
| Email marketing | $0-25 |
| **TOTAL mensual** | **~$600-1200 USD/mes** |

**ROI esperado**: si cada venta deja $5-15M COP de margen y vendés +5-10 autos/mes adicionales por marketing → ROI mínimo 5x.

---

# 🎯 Métricas para medir éxito

Vamos a trackear esto MES a MES:

| Métrica | Hoy estimado | Meta mes 3 | Meta mes 6 | Meta mes 12 |
|---|---|---|---|---|
| Visitas únicas/mes | 200-500 | 1.000 | 2.500 | 5.000+ |
| Bot ALTOR — conversaciones/mes | 20-50 | 100 | 200 | 400+ |
| Leads (citas + solicitudes) | 10-30 | 80 | 200 | 400+ |
| Autos vendidos/mes (de la web) | 1-3 | 5-8 | 10-15 | 15-25 |
| Velocidad carga (Google PageSpeed) | 70/100 | 95/100 | 98/100 | 98/100 |
| Tiempo deploy GitHub → producción | 5-15 min | 60 seg | 60 seg | 60 seg |

---

# ⚠️ Riesgos + plan de rollback

| Riesgo | Probabilidad | Mitigación | Si todo falla... |
|---|---|---|---|
| Migración a Cloudflare Pages rompe algo | 🟢 Baja (testing E2E previo) | Hacemos branch separada + preview + tu apruebas | Rollback con 1 click a GitHub Pages |
| Dominio Hostinger se vence | 🟢 Baja (renovación auto) | Auto-renovación activada | $10 y volvés a comprar |
| Cloudflare baja (downtime) | 🟢 Muy baja | Cloudflare tiene 99.99% uptime | DNS fallback a GitHub Pages directo |
| Cuenta Cloudflare suspendida | 🟢 Muy baja | Plan free legítimo | Migrar a Netlify gratis en 1 día |
| Firebase rate limit / costo sube | 🟡 Media (si crece mucho) | Te aviso si llegamos al 80% del free tier | Upgrade a Firebase Blaze (~$5-20/mes) |
| Google Ads desperdicia dinero | 🟡 Media (curva de aprendizaje) | Empezamos pequeño ($5/día) | Pausar y ajustar |

---

# ❓ Preguntas frecuentes

### "¿Voy a perder el SEO actual al cambiar de dominio?"
**Respuesta**: NO. Configuramos redirects 301 de `altorracars.github.io/X` → `altorracars.com/X`. Google entiende y transfiere el ranking automáticamente. **Tarda 1-3 meses en re-rankearse completamente.**

### "¿Y si Cloudflare cambia y empieza a cobrar?"
**Respuesta**: Cloudflare Pages tiene plan gratuito desde 2020 sin cambios. Si algún día cambia, migrar a Netlify o Vercel toma 1 día. El código sigue siendo el mismo.

### "¿El bot ALTOR sigue funcionando?"
**Respuesta**: SÍ, 100%. El bot vive en Firebase (no en hosting). Solo cambia el lugar de donde se sirve la web. Bot intacto.

### "¿Voy a poder ver los cambios mientras pruebas?"
**Respuesta**: SÍ. Cada cambio mío genera un preview link tipo `pr-123.altorracars.pages.dev` que vos podés probar antes de aprobar.

### "¿Si me arrepiento y quiero volver a GitHub Pages?"
**Respuesta**: Posible en 1 día. El código sigue en GitHub, solo apuntás el DNS de vuelta a GitHub Pages. Cero pérdida.

### "¿Voy a tener que aprender algo técnico?"
**Respuesta**: NO. Cosas que vos haces:
- Comprar dominio (ya sabés)
- Click en algunos botones siguiendo mis instrucciones
- Aprobar cuando te pregunte

Cosas que YO hago:
- TODO lo demás

### "¿Cuánto tiempo tuyo necesito invertir?"
**Respuesta**: 
- Semana 1: 2-3 horas (dominio + Cloudflare + email)
- Semana 2: 30-60 min (probar preview + aprobar)
- Semana 3: 30 min (revisar fotos optimizadas)
- Semana 4: 2-3 horas (Google Business Profile + verificaciones)
- **Total: 5-8 horas en 4 semanas**

---

# 📞 Cómo trabajamos día a día

### Cuando empiezo el jueves:
1. Te digo "ya empecé la Fase 1"
2. Te paso pasos exactos para tu parte (capturas si necesitás)
3. Esperas mi confirmación antes de cada paso crítico
4. Probás lo que te muestro
5. Aprobás o me decís qué arreglar

### Si algo se rompe:
1. Avisame en lenguaje normal: "no anda X cosa"
2. Yo diagnostico en 5-15 min
3. Si es urgente, rollback inmediato
4. Si no, lo arreglo en background

### Si tenés idea o duda:
1. Decimela como me la dirías a un amigo
2. Yo evalúo si conviene + costo + tiempo
3. Te recomiendo qué hacer

---

# ✅ Checklist para el JUEVES

Antes de empezar, confirmá:

- [ ] Decidí el nombre del dominio (`.com` o `.com.co`)
- [ ] Tengo tarjeta para pagar Hostinger
- [ ] Sé mi password de Gmail
- [ ] Tengo acceso a Firebase Console
- [ ] Tengo acceso a GitHub
- [ ] Leí este plan al menos por encima
- [ ] Me bloqueo 2-3 horas el jueves para Fase 1

Cuando estés listo, mandame: **"arrancamos con la Fase 1"**.

---

# 📚 Estado actual del proyecto (snapshot pre-migración)

Para mi referencia (vos ignorá esta sección, es técnica):

- Repo: `altorracars/altorracars.github.io`
- Hosting actual: GitHub Pages
- Backend: Firebase (Firestore + Auth + Storage + RTDB + Functions + FCM)
- Bot: Anthropic Claude Haiku 4.5 + sistema fallback rules
- LLM costo actual: ~$2-5/mes
- Cache version actual: v20260514100000
- Branch trabajo activa: `claude/start-next-sprint-dlVh4`
- Plan §82+§83+§84 (Smart Update Prompts) implementado
- Plan §61 RBAC dinámico funcional 100%
- Mega-Plan §59 ALTOR Hub 7/7 sprints completos
- 84 sprints documentados en CLAUDE.md

---

**Última actualización**: 2026-05-11
**Próxima revisión**: cuando el cliente diga "arrancamos"
**Autor**: Claude (agente profesional de Altorra Cars)

🚀 **Listos para crecer.**
