// ============================================================
// Datos demo para el modo ?mock=1 (verificación local sin Firebase).
// Auth/Firestore quedan fuera; la UI completa se ejercita con esto.
// Timestamps ISO relativos a "ahora".
// ============================================================

const minsAgo = (m) => new Date(Date.now() - m * 60000).toISOString();
const hoursAgo = (h) => minsAgo(h * 60);
const daysAgo = (d) => minsAgo(d * 60 * 24);

const TEAM = [
  { uid: 'u_ceo', nombre: 'Rodrigo (CEO)', cargo: 'CEO' },
  { uid: 'u_ana', nombre: 'Ana Restrepo', cargo: 'Asesora comercial' },
  { uid: 'u_luis', nombre: 'Luis Pérez', cargo: 'Asesor comercial' },
];

const LEADS = [
  {
    id: 'l1', fullName: 'María Fernanda Gómez', email: 'mafe.gomez@gmail.com', phone: '+573012345678',
    source: 'financiacion', sourceDetail: 'financiacion', vehicleOfInterestId: 'mazda-cx5-2021',
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: minsAgo(-40), contactId: 'email_mafe_gomez_gmail_com',
    createdAt: minsAgo(18), lastActivityAt: minsAgo(18), _version: 1,
  },
  {
    id: 'l2', fullName: 'Carlos Andrés Salcedo', email: 'casalcedo@outlook.com', phone: '+573159876543',
    source: 'cita', sourceDetail: 'test_drive', vehicleOfInterestId: 'toyota-corolla-2022',
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: minsAgo(5), contactId: 'email_casalcedo_outlook_com',
    createdAt: hoursAgo(1), lastActivityAt: hoursAgo(1), _version: 1,
  },
  {
    id: 'l3', fullName: 'Diana Ramírez', email: 'diana.r@hotmail.com', phone: '+573201112233',
    source: 'web', sourceDetail: 'compra', vehicleOfInterestId: 'chevrolet-tracker-2023',
    status: 'contactado', rating: 'cold', score: 0, ownerId: 'u_ana', ownerName: 'Ana Restrepo',
    slaDueAt: hoursAgo(-1), contactId: 'email_diana_r_hotmail_com',
    createdAt: hoursAgo(5), lastActivityAt: hoursAgo(2), _version: 2,
  },
  {
    id: 'l4', fullName: 'Jhon Jairo Mosquera', email: '', phone: '+573044455667',
    source: 'whatsapp', sourceDetail: 'consulta', vehicleOfInterestId: null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: hoursAgo(-3), contactId: 'phone_573044455667',
    createdAt: hoursAgo(8), lastActivityAt: hoursAgo(8), _version: 1,
  },
  {
    id: 'l5', fullName: 'Laura Valentina Ortiz', email: 'lauraortiz@gmail.com', phone: '+573186677889',
    source: 'bot', sourceDetail: 'financiacion', vehicleOfInterestId: 'kia-sportage-2022',
    status: 'contactado', rating: 'cold', score: 0, ownerId: 'u_luis', ownerName: 'Luis Pérez',
    slaDueAt: daysAgo(-1), contactId: 'email_lauraortiz_gmail_com',
    createdAt: daysAgo(1), lastActivityAt: hoursAgo(20), _version: 3,
  },
  {
    id: 'l6', fullName: 'Pedro Nel Arango', email: 'pnarango@empresa.co', phone: '+573017788990',
    source: 'cuenta', sourceDetail: 'registro', vehicleOfInterestId: null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: daysAgo(-1), contactId: 'email_pnarango_empresa_co',
    createdAt: daysAgo(2), lastActivityAt: daysAgo(2), _version: 1,
  },
  {
    id: 'l7', fullName: 'Sofía Mejía', email: 'sofia.mejia@gmail.com', phone: '+573123344556',
    source: 'newsletter', sourceDetail: 'suscripcion', vehicleOfInterestId: null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: daysAgo(-3), contactId: 'email_sofia_mejia_gmail_com',
    createdAt: daysAgo(4), lastActivityAt: daysAgo(4), _version: 1,
  },
  {
    id: 'l8', fullName: 'Andrés Felipe Cuesta', email: 'afcuesta@gmail.com', phone: '+573009988776',
    source: 'web', sourceDetail: 'consignacion_venta', vehicleOfInterestId: null,
    status: 'calificado', rating: 'cold', score: 0, ownerId: 'u_ana', ownerName: 'Ana Restrepo',
    slaDueAt: daysAgo(-2), contactId: 'email_afcuesta_gmail_com',
    createdAt: daysAgo(6), lastActivityAt: daysAgo(1), _version: 4,
  },
  {
    id: 'l9', fullName: 'Catalina Ríos', email: 'cata.rios@gmail.com', phone: '+573145566778',
    source: 'web', sourceDetail: 'peritaje', vehicleOfInterestId: 'nissan-frontier-2020',
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: daysAgo(-10), contactId: 'email_cata_rios_gmail_com',
    createdAt: daysAgo(12), lastActivityAt: daysAgo(35), _version: 1,
  },
  {
    id: 'l10', fullName: 'Gloria Patiño', email: 'glopa@gmail.com', phone: '+573162233445',
    source: 'web', sourceDetail: 'reclamo', vehicleOfInterestId: null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: hoursAgo(-2), contactId: 'email_glopa_gmail_com',
    createdAt: hoursAgo(3), lastActivityAt: hoursAgo(3), _version: 1,
  },
];

const ACTIVITIES = {
  l1: [
    { id: 'a1', type: 'solicitud_inbound', subject: 'Nueva solicitud: financiacion', body: 'Quiero financiar la Mazda CX-5. Cuota inicial 25.000.000, ingresos 6.000.000 mensuales.', direction: 'inbound', status: 'open', relatedTo: { type: 'lead', id: 'l1', name: 'María Fernanda Gómez' }, createdAt: minsAgo(18), _version: 1 },
  ],
  l3: [
    { id: 'a2', type: 'solicitud_inbound', subject: 'Nueva solicitud: compra', body: 'Interesada en la Chevrolet Tracker.', direction: 'inbound', status: 'open', relatedTo: { type: 'lead', id: 'l3', name: 'Diana Ramírez' }, createdAt: hoursAgo(5), _version: 1 },
    { id: 'a3', type: 'whatsapp', subject: 'WhatsApp enviado', body: '', direction: 'outbound', status: 'closed', relatedTo: { type: 'lead', id: 'l3', name: 'Diana Ramírez' }, createdAt: hoursAgo(2), _version: 1 },
    { id: 'a4', type: 'status_change', subject: 'Cambio de estado → contactado', body: '', direction: 'outbound', status: 'closed', relatedTo: { type: 'lead', id: 'l3', name: 'Diana Ramírez' }, createdAt: hoursAgo(2), _version: 1 },
  ],
  l5: [
    { id: 'a5', type: 'solicitud_inbound', subject: 'Nueva lead: financiacion', body: 'Bot ALTOR: pregunta por financiación de la Kia Sportage.', direction: 'inbound', status: 'open', relatedTo: { type: 'lead', id: 'l5', name: 'Laura Valentina Ortiz' }, createdAt: daysAgo(1), _version: 1 },
    { id: 'a6', type: 'whatsapp', subject: 'WhatsApp enviado', body: '', direction: 'outbound', status: 'closed', relatedTo: { type: 'lead', id: 'l5', name: 'Laura Valentina Ortiz' }, createdAt: hoursAgo(20), _version: 1 },
  ],
};

const CONTACTS = {};
LEADS.forEach((l) => {
  CONTACTS[l.contactId] = {
    id: l.contactId, fullName: l.fullName, email: l.email, phone: l.phone, type: 'lead',
    source: l.source, score: 0, rating: 'cold', lifecycleStage: 'lead', clienteUid: null,
    consent: { email: l.source !== 'web', whatsapp: l.source !== 'web', calls: false, askedAt: l.createdAt, source: l.source, policyVersion: 'v1' },
    doNotContact: l.source === 'web', tags: [], createdAt: l.createdAt, lastActivityAt: l.lastActivityAt, _version: 1,
  };
});

const NOTES = {}; // contactId -> [{id, body, authorName, createdAt}]

// API mock (clona para no mutar las constantes salvo vía helpers)
export const getMockLeads = () => LEADS.map((l) => ({ ...l }));
export const getMockTeam = () => TEAM.map((t) => ({ ...t }));
export const getMockActivities = (leadId) => (ACTIVITIES[leadId] || []).map((a) => ({ ...a }));
export const getMockContact = (contactId) => (CONTACTS[contactId] ? { ...CONTACTS[contactId] } : null);
export const getMockNotes = (contactId) => (NOTES[contactId] || []).map((n) => ({ ...n }));
export function addMockNote(contactId, note) {
  if (!NOTES[contactId]) NOTES[contactId] = [];
  NOTES[contactId].unshift({ id: 'n' + Date.now(), ...note });
}

// ── Deals (Pipeline, Fase 3) ──
let DEAL_SEQ = 100;
const MOCK_DEALS = [
  { id: 'd1', name: 'Diana Ramírez · Chevrolet Tracker 2023', contactName: 'Diana Ramírez', contactId: 'email_diana_r_hotmail_com', leadId: 'l3', vehicleId: 'chevrolet-tracker-2023', vehicleName: 'Chevrolet Tracker 2023', pipelineId: 'ventas', stageId: 'contactado', stageName: 'Contactado', status: 'open', amount: 82000000, currency: 'COP', probability: 0.20, weightedAmount: 16400000, ownerId: 'u_ana', ownerName: 'Ana Restrepo', source: 'web', lastActivityAt: hoursAgo(2), createdAt: hoursAgo(5), _version: 2 },
  { id: 'd2', name: 'Laura Valentina Ortiz · Kia Sportage 2022', contactName: 'Laura Valentina Ortiz', contactId: 'email_lauraortiz_gmail_com', leadId: 'l5', vehicleId: 'kia-sportage-2022', vehicleName: 'Kia Sportage 2022', pipelineId: 'ventas', stageId: 'cita_agendada', stageName: 'Cita agendada', status: 'open', amount: 95000000, currency: 'COP', probability: 0.35, weightedAmount: 33250000, ownerId: 'u_luis', ownerName: 'Luis Pérez', source: 'bot', lastActivityAt: hoursAgo(20), createdAt: daysAgo(1), _version: 3 },
  { id: 'd3', name: 'Andrés Felipe Cuesta · Mazda 3 2021', contactName: 'Andrés Felipe Cuesta', contactId: 'email_afcuesta_gmail_com', leadId: 'l8', vehicleId: 'mazda-3-2021', vehicleName: 'Mazda 3 2021', pipelineId: 'ventas', stageId: 'test_drive', stageName: 'Test drive', status: 'open', amount: 68000000, currency: 'COP', probability: 0.65, weightedAmount: 44200000, ownerId: 'u_ana', ownerName: 'Ana Restrepo', source: 'web', lastActivityAt: daysAgo(18), createdAt: daysAgo(20), _version: 5 },
  { id: 'd4', name: 'Roberto Gómez · Toyota Hilux 2020', contactName: 'Roberto Gómez', contactId: 'phone_573001239876', leadId: null, vehicleId: 'toyota-hilux-2020', vehicleName: 'Toyota Hilux 2020', pipelineId: 'ventas', stageId: 'negociacion', stageName: 'Negociación', status: 'open', amount: 135000000, currency: 'COP', probability: 0.80, weightedAmount: 108000000, ownerId: 'u_luis', ownerName: 'Luis Pérez', source: 'whatsapp', lastActivityAt: hoursAgo(6), createdAt: daysAgo(8), _version: 7 },
  { id: 'd5', name: 'Sandra Milena Vélez · Renault Duster 2022', contactName: 'Sandra Milena Vélez', contactId: 'email_smvelez_gmail_com', leadId: null, vehicleId: 'renault-duster-2022', vehicleName: 'Renault Duster 2022', pipelineId: 'ventas', stageId: 'nuevo', stageName: 'Nuevo', status: 'open', amount: 0, currency: 'COP', probability: 0.10, weightedAmount: 0, ownerId: null, ownerName: null, source: 'cuenta', lastActivityAt: hoursAgo(1), createdAt: hoursAgo(1), _version: 1 },
];

export const getMockDeals = () => MOCK_DEALS.map((d) => ({ ...d }));
export function addMockDeal(deal) {
  const id = 'd' + (++DEAL_SEQ);
  MOCK_DEALS.unshift({ id, ...deal });
  return id;
}
export function updateMockDeal(id, patch) {
  const i = MOCK_DEALS.findIndex((d) => d.id === id);
  if (i >= 0) MOCK_DEALS[i] = { ...MOCK_DEALS[i], ...patch };
}

// ── Agenda (Fase 3b): citas con dueAt ──
const atDay = (offset, hour = 10, min = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); d.setHours(hour, min, 0, 0); return d.toISOString(); };
const MOCK_AGENDA = [
  { id: 'ag1', type: 'cita', subject: 'Test drive Toyota Corolla', dueAt: atDay(1, 10), relatedTo: { type: 'lead', id: 'l2', name: 'Carlos Andrés Salcedo' }, status: 'open' },
  { id: 'ag2', type: 'cita', subject: 'Visita showroom', dueAt: atDay(1, 12), relatedTo: { type: 'lead', id: 'l1', name: 'María Fernanda Gómez' }, status: 'open' },
  { id: 'ag3', type: 'cita', subject: 'Cierre financiación', dueAt: atDay(1, 15), relatedTo: { type: 'lead', id: 'l5', name: 'Laura Valentina Ortiz' }, status: 'open' },
  { id: 'ag4', type: 'cita', subject: 'Llamada de seguimiento', dueAt: atDay(1, 17), relatedTo: { type: 'lead', id: 'l3', name: 'Diana Ramírez' }, status: 'open' },
  { id: 'ag5', type: 'cita', subject: 'Entrega de vehículo', dueAt: atDay(3, 9), relatedTo: { type: 'lead', id: 'l8', name: 'Andrés Felipe Cuesta' }, status: 'open' },
  { id: 'ag6', type: 'cita', subject: 'Peritaje', dueAt: atDay(5, 11), relatedTo: { type: 'lead', id: 'l9', name: 'Catalina Ríos' }, status: 'open' },
  { id: 'ag7', type: 'cita', subject: 'Negociación precio', dueAt: atDay(-2, 16), relatedTo: { type: 'lead', id: 'l3', name: 'Diana Ramírez' }, status: 'open' },
];
export const getMockAgenda = () => MOCK_AGENDA.map((e) => ({ ...e }));
export function addMockAgenda(ev) { MOCK_AGENDA.push({ id: 'ag' + (MOCK_AGENDA.length + 1), ...ev }); }

// ── Captura manual (Fase: leads externos) ──
let LEAD_SEQ = 100;
export function addMockLead(d) {
  const id = 'lm' + (++LEAD_SEQ);
  const now = new Date().toISOString();
  const digits = (d.telefono || '').replace(/\D/g, '');
  const pref = (d.prefijoPais || '+57').replace(/\D/g, '');
  const phone = digits ? '+' + (digits.startsWith(pref) ? digits : pref + digits) : '';
  const email = (d.email || '').trim().toLowerCase();
  const lead = {
    id,
    fullName: d.nombre || 'Sin nombre',
    email,
    phone,
    source: d.canal || 'manual',
    sourceDetail: d.interes || 'consulta',
    vehicleOfInterestId: d.vehiculoId || null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null, ownerName: null,
    slaDueAt: null,
    contactId: email ? 'email_' + email.replace(/[^a-z0-9]/gi, '_') : 'phone_' + digits,
    tags: ['manual', d.trafico, d.campana].filter(Boolean),
    createdAt: now, lastActivityAt: now, _version: 1,
  };
  LEADS.unshift(lead);
  return id;
}
