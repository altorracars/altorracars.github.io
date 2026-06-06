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
