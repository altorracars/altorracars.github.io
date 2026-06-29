// ============================================================
// Cerebro AI / Knowledge Base (PLAN-UNIFICADO F-4 2/3, gap §2.B) — datos.
// GESTIÓN de las FAQs (`knowledgeBase/{id}`) que el bot rule-based consulta.
// Port de admin-kb.js (parte CRUD; el `findBest`/`recordUsage` los consume el
// BOT público — stack viejo hasta F-1 — NO el admin). La config del brain
// (`_brain`: identidad/LLM) se difiere al trabajo del bot (LLM dormido).
//
// Schema: {question, answer, keywords[], category, enabled, priority(1-100),
// usageCount, createdAt/By, updatedAt/By}. Rules (firestore.rules:875):
// read=auth/kb.read · create=kb.create · update=kb.edit · delete=kb.delete.
// El doc singleton `_brain` (sin `priority`) queda fuera del orderBy y se filtra.
// ============================================================

import {
  collection, onSnapshot, query, orderBy, doc, addDoc, setDoc, deleteDoc, writeBatch,
} from 'firebase/firestore';
import { db } from '../../core/firebase.js';

export const CATEGORIES = ['general', 'financiacion', 'inventario', 'politica', 'horarios', 'ubicacion', 'consignacion'];

/** Suscripción a las FAQs (priority desc). Filtra el doc `_brain` (config, no FAQ). */
export function subscribeFaqs(onData, onError) {
  const q = query(collection(db, 'knowledgeBase'), orderBy('priority', 'desc'));
  return onSnapshot(q, (snap) => {
    const list = [];
    snap.forEach((d) => { if (d.id !== '_brain') list.push({ _docId: d.id, ...d.data() }); });
    onData(list);
  }, (err) => onError && onError(err));
}

export async function createFaq(data) {
  const ref = await addDoc(collection(db, 'knowledgeBase'), data);
  return ref.id;
}

export async function updateFaq(id, data) {
  await setDoc(doc(db, 'knowledgeBase', id), data, { merge: true });
}

export async function deleteFaq(id) {
  await deleteDoc(doc(db, 'knowledgeBase', id));
}

export async function toggleFaq(id, enabled) {
  await setDoc(doc(db, 'knowledgeBase', id), { enabled }, { merge: true });
}

/**
 * Bootstrap: siembra las 25 FAQs profesionales que falten (dedup por question
 * normalizada). Solo kb.bootstrap (super_admin). Devuelve cuántas creó.
 */
export async function bootstrapFaqs(existing, by) {
  const have = new Set((existing || []).map((e) => String(e.question || '').toLowerCase().trim()));
  const toCreate = BOOTSTRAP_FAQS.filter((f) => !have.has(f.question.toLowerCase().trim()));
  if (!toCreate.length) return 0;
  const batch = writeBatch(db);
  const nowIso = new Date().toISOString();
  const coll = collection(db, 'knowledgeBase');
  toCreate.forEach((f) => {
    batch.set(doc(coll), {
      question: f.question, answer: f.answer, keywords: f.keywords, category: f.category,
      enabled: true, priority: f.priority || 50, usageCount: 0, lastUsedAt: null,
      createdAt: nowIso, createdBy: by, updatedAt: nowIso, updatedBy: by, _bootstrapped: true,
    });
  });
  await batch.commit();
  return toCreate.length;
}

/* ── 25 FAQs profesionales (port admin-kb §26.2 BOOTSTRAP_FAQS) ───────────── */
export const BOOTSTRAP_FAQS = [
  { question: '¿Dónde están ubicados?', answer: 'Estamos en Cartagena, Bolívar, Colombia. Atendemos clientes de toda la Costa Caribe. Si quieres agendar una visita, dime "agendar cita" y te conecto con un asesor.', keywords: ['ubicacion', 'donde estan', 'donde quedan', 'cartagena', 'sede', 'direccion', 'como llego'], category: 'ubicacion', priority: 90 },
  { question: '¿Cuál es el horario de atención?', answer: 'Atendemos de **Lunes a Sábado de 8:00 AM a 6:00 PM**. Domingos cerrado. Si tienes alguna urgencia, escríbeme aquí y te conecto con un asesor por WhatsApp.', keywords: ['horario', 'cuando abren', 'atienden hoy', 'hasta que hora', 'abren domingo'], category: 'horarios', priority: 90 },
  { question: '¿Cuál es el número de teléfono / WhatsApp?', answer: 'Nuestro número es **+57 323 501 6747** 📲 con WhatsApp activo. También me puedes escribir aquí mismo y te conecto con un asesor humano al instante.', keywords: ['telefono', 'celular', 'whatsapp', 'numero', 'contacto'], category: 'general', priority: 85 },
  { question: '¿Qué es el peritaje y cuánto cuesta?', answer: 'El peritaje es una **revisión técnica gratuita** que hacemos a todos los autos que vendemos. Verificamos motor, caja, suspensión, frenos, electricidad y carrocería. Te entregamos un informe escrito. **Es 100% gratis** para clientes que están considerando comprar o consignar.', keywords: ['peritaje', 'inspeccion', 'revision', 'chequeo', 'diagnostico', 'cuanto cuesta peritaje'], category: 'politica', priority: 85 },
  { question: '¿Dan garantía mecánica?', answer: 'Sí, todos nuestros vehículos tienen **90 días de garantía mecánica** en motor y caja. Cubre fallas que no sean por mal uso. Te entregamos el certificado al momento de la compra.', keywords: ['garantia', 'garantizan', 'cuanto tiempo de garantia', 'cubren', 'tres meses', '90 dias'], category: 'politica', priority: 85 },
  { question: '¿Cómo funciona la financiación?', answer: 'Trabajamos con **bancos aliados** (Bancolombia, Davivienda, Banco de Bogotá, etc). Cuotas de **12 a 72 meses**. Cuota inicial **mínima 30%**. Te ayudamos con todo el trámite: solicitud, documentos, aprobación. Aprobación en 24-48h. ¿Querés simular tu cuota?', keywords: ['financiacion', 'credito', 'cuotas', 'plazo', 'banco', 'prestamo', 'mensual', 'inicial'], category: 'financiacion', priority: 95 },
  { question: '¿Cuál es la cuota inicial mínima?', answer: 'La cuota inicial mínima es del **30% del valor del vehículo**. A mayor cuota inicial, menor es la cuota mensual. Si necesitas simular escenarios distintos, podemos ayudarte con eso.', keywords: ['cuota inicial', 'inicial', 'enganche', 'minimo', 'prima', 'que pongo de inicial'], category: 'financiacion', priority: 90 },
  { question: '¿A cuántos meses puedo financiar?', answer: 'Podés financiar de **12 a 72 meses** (1 a 6 años) según el banco y tu perfil crediticio. La aprobación final la da el banco en 24-48 horas.', keywords: ['plazo', 'meses', 'cuanto tiempo financiar', 'cuantos años', 'a cuantos meses'], category: 'financiacion', priority: 88 },
  { question: '¿Quiero vender mi auto, cómo funciona la consignación?', answer: 'En consignación nosotros lo **vendemos por ti**: lo exhibimos, hacemos el marketing, atendemos llamadas, mostramos el auto, todo. Tú solo recibes la plata cuando se vende. **Sin costo si lo vendemos nosotros**. Primero hacemos un peritaje gratuito y te damos un precio sugerido. ¿Te interesa?', keywords: ['consignar', 'consignacion', 'vender mi auto', 'venta de mi carro', 'pongo en venta', 'reciben mi auto'], category: 'consignacion', priority: 90 },
  { question: '¿Cuánto vale mi auto? ¿Hacen avalúo?', answer: 'Sí, **el avalúo es gratuito**. Necesitamos verlo en persona (15-20 min): revisamos kilometraje, estado mecánico y de carrocería. Te damos una oferta justa basada en precios reales del mercado. ¿Querés agendar el avalúo?', keywords: ['avaluo', 'tasacion', 'cuanto vale mi', 'cuanto me dan', 'tasar', 'valuar'], category: 'consignacion', priority: 85 },
  { question: '¿Reciben mi auto como parte de pago?', answer: '¡Sí! **Recibimos tu auto como parte de pago** del nuevo. Hacemos el avalúo gratuito y descontamos ese valor del auto que quieres llevar. Te ahorra el trámite de venderlo por separado.', keywords: ['parte de pago', 'permuta', 'cambio mi auto', 'me reciben', 'tomar como parte'], category: 'consignacion', priority: 85 },
  { question: '¿Hacen entrega del auto en otra ciudad?', answer: 'Estamos en **Cartagena** pero coordinamos envío a otras ciudades de Colombia. El costo del transporte depende de la ciudad. Te lo cotizamos en el momento de la compra.', keywords: ['envio', 'envian', 'entregan', 'otra ciudad', 'bogota', 'medellin', 'transporte'], category: 'general', priority: 75 },
  { question: '¿Qué documentos necesito para comprar?', answer: 'Para **compra de contado**: cédula vigente. Para **financiación**: cédula, certificado laboral, extractos bancarios últimos 3 meses, declaración de renta si aplica. Te ayudamos paso a paso.', keywords: ['documentos', 'papeles', 'requisitos', 'que necesito', 'que piden'], category: 'general', priority: 80 },
  { question: '¿Hacen el traspaso del vehículo?', answer: 'Sí, **nosotros nos encargamos del traspaso**. Nos das los documentos, vamos a notaría, lo pasamos a tu nombre y tramitamos los runt. Todo incluido en el precio.', keywords: ['traspaso', 'paso a nombre', 'tramite', 'runt', 'notaria', 'documentacion'], category: 'politica', priority: 80 },
  { question: '¿Los autos vienen con SOAT y técnico-mecánica?', answer: 'Sí, todos nuestros vehículos se entregan con **SOAT vigente** y **técnico-mecánica al día** (cuando aplica por antigüedad). Sin sorpresas.', keywords: ['soat', 'tecnico mecanica', 'rtm', 'revision tecnica', 'documentos al dia'], category: 'politica', priority: 78 },
  { question: '¿Puedo hacer test drive antes de comprar?', answer: '¡Por supuesto! El **test drive es parte del proceso**. Agendás una cita, vas a nuestra sede en Cartagena, lo manejas con un asesor a bordo. Sin compromiso de compra.', keywords: ['test drive', 'manejarlo', 'probar', 'prueba de manejo', 'puedo manejar'], category: 'general', priority: 80 },
  { question: '¿Qué tipos de vehículos manejan?', answer: 'Manejamos **SUVs, sedanes, hatchbacks y pickups** de las marcas más confiables (Toyota, Mazda, Chevrolet, Renault, Kia, Hyundai, Nissan, Ford). Tanto **usados como semi-nuevos**. Dime qué andas buscando y te muestro opciones.', keywords: ['que tipos', 'que manejan', 'que venden', 'que carros tienen', 'que marcas'], category: 'inventario', priority: 88 },
  { question: '¿Tienen autos a menos de $30 millones?', answer: 'Sí, tenemos opciones desde **$25 millones** (autos usados con buen kilometraje y peritaje aprobado). Decime tu rango exacto y te muestro las mejores opciones.', keywords: ['barato', 'economico', 'precio bajo', 'menos de', 'rango', '20 millones', '30 millones'], category: 'inventario', priority: 85 },
  { question: '¿Negocian el precio?', answer: 'Para hablar de **rebajas y precios finales** necesitas conectar con un asesor humano. Ellos manejan los descuentos según el caso. Dime "hablar con asesor" y te conecto al instante.', keywords: ['rebaja', 'descuento', 'negociable', 'precio final', 'minimo', 'mejor precio', 'le hago'], category: 'general', priority: 80 },
  { question: '¿Aceptan pago con tarjeta?', answer: 'Aceptamos **transferencia bancaria, cheque, tarjeta de crédito (con recargo)** y por supuesto efectivo. Para grandes montos te recomendamos transferencia (más seguro).', keywords: ['pago', 'tarjeta', 'transferencia', 'cheque', 'efectivo', 'como pago'], category: 'general', priority: 70 },
  { question: '¿Quién es ALTOR?', answer: 'Soy **ALTOR**, el asistente virtual de Altorra Cars 🤖. Te ayudo 24/7 con consultas rápidas, mostrarte el inventario, agendar visitas. Si necesitas algo más complejo, te conecto con un asesor humano al instante.', keywords: ['quien eres', 'que eres', 'eres bot', 'eres humano', 'altor', 'inteligencia artificial'], category: 'general', priority: 70 },
  { question: '¿Cómo agendo una visita?', answer: 'Para agendar una visita dime **"quiero agendar"** o **"hablar con asesor"** y te conecto con un humano que te coordina la fecha y hora. También puedes escribir directo al WhatsApp +57 323 501 6747.', keywords: ['agendar', 'cita', 'visita', 'cuando puedo ir', 'verlo en persona', 'cuadrar'], category: 'general', priority: 92 },
  { question: '¿Qué pasa si el auto que me gusta tiene falla?', answer: 'Antes de venderse, **todos pasan por peritaje técnico**. Si después de comprarlo aparece una falla cubierta por garantía (90 días motor/caja), lo reparamos sin costo. Si quieres, puedes también **pedir un peritaje externo** antes de comprar — lo aceptamos sin problema.', keywords: ['falla', 'problema', 'rompe', 'garantia mecanica', 'peritaje externo', 'tercero'], category: 'politica', priority: 78 },
  { question: '¿Aceptan motos como parte de pago?', answer: 'Recibimos **motos de marcas reconocidas** (Yamaha, Honda, Suzuki, Kawasaki, Bajaj) como parte de pago. Hacemos avalúo gratuito. Dime qué moto tienes y te oriento.', keywords: ['moto', 'motocicleta', 'permuta moto', 'cambio mi moto'], category: 'consignacion', priority: 65 },
  { question: '¿Cuánto rinde un auto en gasolina?', answer: 'Depende del modelo y motor. Como referencia: **autos pequeños/sedanes 1.6L → 35-45 km/galón**, **SUVs medianas → 30-38 km/galón**, **pickups → 25-32 km/galón**. Si me dices qué modelo te interesa, te paso el dato exacto.', keywords: ['rendimiento', 'consumo', 'gasolina', 'km por galon', 'cuanto rinde', 'gasta mucho'], category: 'inventario', priority: 70 },
];

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
export const MOCK_FAQS = [
  { _docId: 'f1', question: '¿Cuál es el horario de atención?', answer: 'Lunes a Sábado de 8 AM a 6 PM. Domingos cerrado.', keywords: ['horario', 'cuando abren'], category: 'horarios', enabled: true, priority: 90, usageCount: 42 },
  { _docId: 'f2', question: '¿Cómo funciona la financiación?', answer: 'Bancos aliados, cuotas 12-72 meses, inicial mínima 30%.', keywords: ['financiacion', 'credito', 'cuotas'], category: 'financiacion', enabled: true, priority: 95, usageCount: 88 },
  { _docId: 'f3', question: '¿Dan garantía mecánica?', answer: '90 días de garantía en motor y caja.', keywords: ['garantia', 'garantizan'], category: 'politica', enabled: false, priority: 85, usageCount: 12 },
];
