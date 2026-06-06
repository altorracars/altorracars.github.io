const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentWritten, onDocumentCreated, onDocumentUpdated, onDocumentDeleted } = require('firebase-functions/v2/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { defineSecret } = require('firebase-functions/params');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const db = admin.firestore();

// ========== SECRETS ==========
// Set with: firebase functions:secrets:set GITHUB_PAT
const githubPat = defineSecret('GITHUB_PAT');
// Set with: firebase functions:secrets:set EMAIL_USER
// Set with: firebase functions:secrets:set EMAIL_PASS
const emailUser = defineSecret('EMAIL_USER');
const emailPass = defineSecret('EMAIL_PASS');

// §26.5 — Telegram Bot $0 (alternativa gratuita a FCM Web Push).
// Setup: crear bot en @BotFather → recibir token → guardarlo:
//   firebase functions:secrets:set TELEGRAM_BOT_TOKEN
// Si NO está seteado, las funciones Telegram skip silente (best-effort).
const telegramBotToken = defineSecret('TELEGRAM_BOT_TOKEN');

// FASE 3 — LLM secret para el Cerebro Altorra AI (ALTOR bot)
// Set with: firebase functions:secrets:set LLM_API_KEY
// El provider se lee del doc Firestore knowledgeBase/_brain.llmProvider
// (anthropic | openai | google). NO requiere secret separado.
const llmApiKey = defineSecret('LLM_API_KEY');

// ========== SOLICITUDES: SHARED HELPERS ==========

const TIPO_LABELS = {
    // Client-side types
    test_drive: 'Prueba de manejo',
    compra: 'Quiero comprar',
    consulta_vehiculo: 'Consulta sobre vehiculo',
    llamada: 'Agendar llamada',
    consignacion_venta: 'Vender mi auto / Consignacion',
    financiacion: 'Solicitud de financiacion',
    consulta_general: 'Consulta general',
    peritaje: 'Peritaje / Inspeccion',
    otro: 'Otro asunto',
    // Admin-side types
    visita: 'Visita presencial',
    consignacion: 'Consignacion',
    inspeccion: 'Inspeccion vehicular',
    prueba: 'Prueba de manejo',
    entrega: 'Entrega de vehiculo',
    llamada_telefonica: 'Llamada telefonica',
    seguimiento: 'Seguimiento',
    financiacion_admin: 'Financiacion'
};

const ORIGEN_LABELS = {
    vehiculo: 'Pagina de vehiculo',
    index: 'Pagina principal',
    contacto: 'Formulario de contacto',
    vende_tu_auto: 'Vende tu auto',
    financiacion: 'Formulario financiacion',
    admin: 'Panel Admin'
};

function getTipoLabel(tipo) { return TIPO_LABELS[tipo] || (tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : 'General'); }
function getOrigenLabel(origen) { return ORIGEN_LABELS[origen] || (origen ? origen.charAt(0).toUpperCase() + origen.slice(1) : 'Sitio Web'); }

function createTransporter(user, pass) {
    return nodemailer.createTransport({ service: 'gmail', auth: { user: user, pass: pass } });
}

// ========== F12.1: EMAIL TO ADMIN ON NEW SOLICITUD ==========
/**
 * Firestore trigger: sends an email notification to ADMIN when a new solicitud is created.
 * Idempotent: checks emailSent field to avoid duplicate emails.
 * Uses Gmail SMTP via Nodemailer (free tier: 500 emails/day).
 *
 * Setup required (one-time, in PowerShell):
 *   firebase functions:secrets:set EMAIL_USER   → your Gmail address
 *   firebase functions:secrets:set EMAIL_PASS   → your Gmail App Password
 *     (Generate at: https://myaccount.google.com/apppasswords)
 */
exports.onNewSolicitud = onDocumentCreated({
    document: 'solicitudes/{solicitudId}',
    region: 'us-central1',
    secrets: [emailUser, emailPass]
}, async (event) => {
    const snap = event.data;
    if (!snap) return;

    const sol = snap.data();
    const solId = event.params.solicitudId;

    // Idempotency: skip if email was already sent
    if (sol.emailSent === true) {
        console.log('[Email] Skipped solicitud ' + solId + ' — email already sent');
        return;
    }

    const user = emailUser.value();
    const pass = emailPass.value();
    if (!user || !pass) {
        console.warn('[Email] EMAIL_USER or EMAIL_PASS not configured.');
        return;
    }

    const nombre = sol.nombre || 'Sin nombre';
    const telefono = sol.telefono || 'No proporcionado';
    const prefijo = sol.prefijoPais || '';
    const email = sol.email || 'No proporcionado';
    const fecha = sol.fecha || 'No aplica';
    const hora = sol.hora || 'No aplica';
    const vehiculo = sol.vehiculo || 'General';
    const tipo = sol.tipo || 'consulta_general';
    const origen = sol.origen || 'index';
    const comentarios = sol.comentarios || sol.mensaje || 'Ninguno';

    // Build extra data rows for specific types
    let extraRows = '';
    const datos = sol.datosExtra || {};
    if (tipo === 'financiacion' || tipo === 'financiacion_admin') {
        if (datos.precioVehiculo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Precio vehiculo</td><td style="padding:8px 0">$' + datos.precioVehiculo + '</td></tr>';
        if (datos.cuotaInicial) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Cuota inicial</td><td style="padding:8px 0">$' + datos.cuotaInicial + '</td></tr>';
        if (datos.plazo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Plazo</td><td style="padding:8px 0">' + datos.plazo + ' meses</td></tr>';
        if (datos.ingresos) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Ingresos mensuales</td><td style="padding:8px 0">$' + datos.ingresos + '</td></tr>';
        if (datos.situacionLaboral) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Situacion laboral</td><td style="padding:8px 0">' + datos.situacionLaboral + '</td></tr>';
    }
    if (tipo === 'consignacion_venta') {
        if (datos.marcaVehiculo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Marca</td><td style="padding:8px 0">' + datos.marcaVehiculo + '</td></tr>';
        if (datos.modeloVehiculo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Modelo</td><td style="padding:8px 0">' + datos.modeloVehiculo + '</td></tr>';
        if (datos.yearVehiculo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Ano</td><td style="padding:8px 0">' + datos.yearVehiculo + '</td></tr>';
        if (datos.kmVehiculo) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Kilometraje</td><td style="padding:8px 0">' + datos.kmVehiculo + ' km</td></tr>';
        if (datos.precioEsperado) extraRows += '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Precio esperado</td><td style="padding:8px 0">$' + datos.precioEsperado + '</td></tr>';
    }

    const subject = 'Nueva solicitud: ' + nombre + ' — ' + getTipoLabel(tipo);

    const html = '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">'
        + '<div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;text-align:center">'
        + '<h2 style="margin:0;color:#f0c040">ALTORRA CARS</h2>'
        + '<p style="margin:5px 0 0;opacity:0.8">Nueva solicitud recibida</p>'
        + '</div>'
        + '<div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">'
        + '<table style="width:100%;border-collapse:collapse">'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Cliente</td><td style="padding:8px 0">' + nombre + '</td></tr>'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Telefono</td><td style="padding:8px 0">' + prefijo + ' ' + telefono + '</td></tr>'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Email</td><td style="padding:8px 0">' + email + '</td></tr>'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Tipo</td><td style="padding:8px 0"><strong>' + getTipoLabel(tipo) + '</strong></td></tr>'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Origen</td><td style="padding:8px 0">' + getOrigenLabel(origen) + '</td></tr>'
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Vehiculo</td><td style="padding:8px 0">' + vehiculo + '</td></tr>'
        + (sol.requiereCita !== false ? '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Fecha</td><td style="padding:8px 0">' + fecha + '</td></tr>' : '')
        + (sol.requiereCita !== false ? '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Hora</td><td style="padding:8px 0">' + hora + '</td></tr>' : '')
        + extraRows
        + '<tr><td style="padding:8px 0;font-weight:bold;color:#555">Comentarios</td><td style="padding:8px 0">' + comentarios + '</td></tr>'
        + '</table>'
        + '<div style="margin-top:20px;padding:12px;background:#f8f9fa;border-radius:6px;text-align:center">'
        + '<a href="https://altorracars.github.io/admin.html" style="color:#1a1a2e;font-weight:bold">Ir al Panel Admin</a>'
        + '</div>'
        + '</div>'
        + '</body></html>';

    try {
        const transporter = createTransporter(user, pass);
        await transporter.sendMail({
            from: '"ALTORRA CARS" <' + user + '>',
            to: user,
            subject: subject,
            html: html
        });

        await snap.ref.update({ emailSent: true });
        console.log('[Email] Admin notification sent for solicitud ' + solId + ' (' + nombre + ')');
    } catch (err) {
        console.error('[Email] Failed for solicitud ' + solId + ':', err.message);
    }
});

// ========== F12.1b: EMAIL TO CLIENT ON STATUS CHANGE ==========
/**
 * Firestore trigger: sends an email to the CLIENT when their solicitud
 * status changes to confirmada, reprogramada, cancelada, or completada.
 * Idempotent: uses statusEmailSent_{estado} field to avoid duplicates.
 */
exports.onSolicitudStatusChanged = onDocumentUpdated({
    document: 'solicitudes/{solicitudId}',
    region: 'us-central1',
    secrets: [emailUser, emailPass]
}, async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    const solId = event.params.solicitudId;

    // Only fire when estado actually changes
    if (before.estado === after.estado) return;

    const newEstado = after.estado;
    // Only send email for these statuses
    if (!['confirmada', 'reprogramada', 'cancelada', 'completada'].includes(newEstado)) return;

    // Idempotency: per-status flag
    const sentFlag = 'statusEmailSent_' + newEstado;
    if (after[sentFlag] === true) {
        console.log('[StatusEmail] Skipped solicitud ' + solId + ' — ' + newEstado + ' email already sent');
        return;
    }

    // Client must have a valid email
    const clientEmail = after.email;
    if (!clientEmail || clientEmail === 'No proporcionado' || !clientEmail.includes('@')) {
        console.log('[StatusEmail] Skipped solicitud ' + solId + ' — no valid client email');
        return;
    }

    const user = emailUser.value();
    const pass = emailPass.value();
    if (!user || !pass) {
        console.warn('[StatusEmail] EMAIL_USER or EMAIL_PASS not configured.');
        return;
    }

    const nombre = after.nombre || 'Cliente';
    const fecha = after.fecha || '';
    const hora = after.hora || '';
    const vehiculo = after.vehiculo || 'General';
    const tipoLabel = getTipoLabel(after.tipo);
    const observaciones = after.observaciones || '';

    // Status-specific email content
    const statusConfig = {
        confirmada: {
            subject: 'Tu solicitud en ALTORRA CARS ha sido confirmada',
            subtitle: 'Solicitud confirmada',
            icon: '&#10004;',
            color: '#16a34a',
            bgColor: '#f0fdf4',
            borderColor: '#16a34a',
            message: 'Tu solicitud de <strong>' + tipoLabel + '</strong> ha sido <strong style="color:#16a34a;">confirmada</strong>.',
            footer: 'Te esperamos! Si necesitas hacer cambios, contactanos por WhatsApp o correo electronico.'
        },
        reprogramada: {
            subject: 'Tu solicitud en ALTORRA CARS ha sido reprogramada',
            subtitle: 'Solicitud reprogramada',
            icon: '&#128197;',
            color: '#2563eb',
            bgColor: '#eff6ff',
            borderColor: '#2563eb',
            message: 'Tu solicitud de <strong>' + tipoLabel + '</strong> ha sido <strong style="color:#2563eb;">reprogramada</strong>.'
                + (fecha ? '<br>Nueva fecha: <strong>' + fecha + '</strong>' : '')
                + (hora ? ' a las <strong>' + hora + '</strong>' : ''),
            footer: 'Si la nueva fecha no te funciona, contactanos para coordinar otra opcion.'
        },
        cancelada: {
            subject: 'Tu solicitud en ALTORRA CARS ha sido cancelada',
            subtitle: 'Solicitud cancelada',
            icon: '&#10006;',
            color: '#dc2626',
            bgColor: '#fef2f2',
            borderColor: '#dc2626',
            message: 'Lamentamos informarte que tu solicitud de <strong>' + tipoLabel + '</strong> ha sido <strong style="color:#dc2626;">cancelada</strong>.'
                + (observaciones ? '<br><em>Motivo: ' + observaciones + '</em>' : ''),
            footer: 'Si deseas agendar una nueva solicitud, visitanos en altorracars.github.io o contactanos por WhatsApp.'
        },
        completada: {
            subject: 'Gracias por tu visita — ALTORRA CARS',
            subtitle: 'Solicitud completada',
            icon: '&#11088;',
            color: '#d97706',
            bgColor: '#fffbeb',
            borderColor: '#d97706',
            message: 'Tu solicitud de <strong>' + tipoLabel + '</strong> ha sido marcada como <strong style="color:#d97706;">completada</strong>. Gracias por confiar en nosotros!',
            footer: 'Fue un placer atenderte. Si necesitas algo mas, estamos a tu disposicion.'
        }
    };

    const cfg = statusConfig[newEstado];

    const html = '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">'
        + '<div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;text-align:center">'
        + '<h2 style="margin:0;color:#f0c040">ALTORRA CARS</h2>'
        + '<p style="margin:5px 0 0;opacity:0.8">' + cfg.subtitle + '</p>'
        + '</div>'
        + '<div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">'
        + '<p style="font-size:1.1rem;">Hola <strong>' + nombre + '</strong>,</p>'
        + '<p>' + cfg.message + '</p>'
        + (fecha ? '<table style="width:100%;border-collapse:collapse;margin:16px 0">'
            + '<tr><td style="padding:10px;font-weight:bold;color:#555;border-bottom:1px solid #eee">Fecha</td><td style="padding:10px;border-bottom:1px solid #eee">' + fecha + '</td></tr>'
            + (hora ? '<tr><td style="padding:10px;font-weight:bold;color:#555;border-bottom:1px solid #eee">Hora</td><td style="padding:10px;border-bottom:1px solid #eee">' + hora + '</td></tr>' : '')
            + '<tr><td style="padding:10px;font-weight:bold;color:#555;border-bottom:1px solid #eee">Vehiculo</td><td style="padding:10px;border-bottom:1px solid #eee">' + vehiculo + '</td></tr>'
            + '</table>' : '')
        + '<div style="margin-top:20px;padding:16px;background:' + cfg.bgColor + ';border-radius:8px;border-left:4px solid ' + cfg.borderColor + ';">'
        + '<p style="margin:0;color:' + cfg.color + ';font-size:0.9rem;">' + cfg.footer + '</p>'
        + '</div>'
        + '<div style="margin-top:20px;text-align:center;font-size:0.8rem;color:#999;">'
        + '<p>ALTORRA CARS — Tu proximo vehiculo te espera</p>'
        + '</div>'
        + '</div>'
        + '</body></html>';

    try {
        const transporter = createTransporter(user, pass);
        await transporter.sendMail({
            from: '"ALTORRA CARS" <' + user + '>',
            to: clientEmail,
            subject: cfg.subject,
            html: html
        });

        const updateData = {};
        updateData[sentFlag] = true;
        await event.data.after.ref.update(updateData);
        console.log('[StatusEmail] ' + newEstado + ' email sent to ' + clientEmail + ' for solicitud ' + solId);
    } catch (err) {
        console.error('[StatusEmail] Failed for solicitud ' + solId + ' (' + newEstado + '):', err.message);
    }
});

// ========== C2: PRICE ALERT — EMAIL CLIENTS ON PRICE DROP ==========
/**
 * Firestore trigger: when a vehicle's price drops, find saved searches
 * with alertas=true that match the vehicle, and email those clients.
 *
 * Matching logic: a saved search matches if ALL of its non-empty filters
 * are satisfied by the vehicle (AND logic). Price range filters match
 * the NEW (lower) price.
 *
 * Rate limit: max 1 alert email per client per vehicle per 24h
 * (via alertEmailSent_{vehicleId}_{timestamp-day} on the search doc).
 */
exports.onVehiclePriceAlert = onDocumentUpdated({
    document: 'vehiculos/{vehicleId}',
    region: 'us-central1',
    secrets: [emailUser, emailPass]
}, async (event) => {
    const before = event.data.before.data();
    const after = event.data.after.data();
    const vehicleId = event.params.vehicleId;

    if (after.estado !== 'disponible') return;

    const oldPrice = before.precioOferta || before.precio;
    const newPrice = after.precioOferta || after.precio;

    if (!oldPrice || !newPrice || newPrice >= oldPrice) return;

    const user = emailUser.value();
    const pass = emailPass.value();
    if (!user || !pass) {
        console.error('[PriceAlert] EMAIL_USER or EMAIL_PASS not configured. Run: firebase functions:secrets:set EMAIL_USER / EMAIL_PASS');
        return;
    }

    const priceDrop = oldPrice - newPrice;
    const dropPct = Math.round((priceDrop / oldPrice) * 100);
    const vehicleName = (after.marca || '') + ' ' + (after.modelo || '') + ' ' + (after.year || '');

    console.log('[PriceAlert] Price drop detected: ' + vehicleName
        + ' — $' + oldPrice.toLocaleString() + ' → $' + newPrice.toLocaleString() + ' (-' + dropPct + '%)');

    // Build vehicle URL using slug pattern: marca-modelo-year-id
    const slug = (after.marca + '-' + after.modelo + '-' + (after.year || '') + '-' + vehicleId)
        .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const vehicleUrl = 'https://altorracars.github.io/vehiculos/' + slug + '.html';

    const clientsSnap = await db.collection('clientes').get();
    let emailsSent = 0;
    let clientsChecked = 0;
    let clientsWithAlerts = 0;

    for (const clientDoc of clientsSnap.docs) {
        clientsChecked++;
        const clientData = clientDoc.data();
        const clientEmail = clientData.email;
        if (!clientEmail || !clientEmail.includes('@')) continue;

        const searchesSnap = await db.collection('clientes').doc(clientDoc.id)
            .collection('busquedasGuardadas')
            .where('alertas', '==', true)
            .get();

        if (searchesSnap.empty) continue;
        clientsWithAlerts++;

        let matched = false;
        for (const searchDoc of searchesSnap.docs) {
            const f = searchDoc.data().filtros || {};
            if (f.marca && f.marca.toLowerCase() !== (after.marca || '').toLowerCase()) continue;
            if (f.tipo && f.tipo.toLowerCase() !== (after.tipo || '').toLowerCase()) continue;
            if (f.categoria && f.categoria.toLowerCase() !== (after.categoria || '').toLowerCase()) continue;
            if (f.transmision && f.transmision.toLowerCase() !== (after.transmision || '').toLowerCase()) continue;
            if (f.combustible && f.combustible.toLowerCase() !== (after.combustible || '').toLowerCase()) continue;
            if (f.precioMin && newPrice < Number(f.precioMin)) continue;
            if (f.precioMax && newPrice > Number(f.precioMax)) continue;
            if (f.yearMin && (after.year || 0) < Number(f.yearMin)) continue;
            if (f.yearMax && (after.year || 9999) > Number(f.yearMax)) continue;
            if (f.kilometrajeMax && (after.kilometraje || 0) > Number(f.kilometrajeMax)) continue;
            matched = true;
            break;
        }

        if (!matched) continue;

        const todayKey = 'alertSent_' + vehicleId + '_' + new Date().toISOString().slice(0, 10);
        if (clientData[todayKey]) {
            console.log('[PriceAlert] Rate limited for ' + clientEmail + ' (already sent today)');
            continue;
        }

        const nombre = clientData.nombre || 'Cliente';
        const formattedOld = '$' + oldPrice.toLocaleString('es-CO');
        const formattedNew = '$' + newPrice.toLocaleString('es-CO');
        const formattedDrop = '$' + priceDrop.toLocaleString('es-CO');

        const html = '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">'
            + '<div style="background:#1a1a2e;color:#fff;padding:20px;border-radius:8px 8px 0 0;text-align:center">'
            + '<h2 style="margin:0;color:#f0c040">ALTORRA CARS</h2>'
            + '<p style="margin:5px 0 0;opacity:0.8">Alerta de precio</p>'
            + '</div>'
            + '<div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">'
            + '<p style="font-size:1.1rem">Hola <strong>' + nombre + '</strong>,</p>'
            + '<p>Un vehiculo que coincide con tus busquedas guardadas ha bajado de precio:</p>'
            + '<div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid #f0c040">'
            + '<h3 style="margin:0 0 8px;color:#1a1a2e">' + vehicleName + '</h3>'
            + '<p style="margin:0;font-size:1.2rem">'
            + '<span style="text-decoration:line-through;color:#999">' + formattedOld + '</span> '
            + '<strong style="color:#16a34a;font-size:1.3rem">' + formattedNew + '</strong>'
            + '</p>'
            + '<p style="margin:4px 0 0;color:#16a34a;font-weight:bold">Ahorro: ' + formattedDrop + ' (-' + dropPct + '%)</p>'
            + '</div>'
            + '<div style="text-align:center;margin:20px 0">'
            + '<a href="' + vehicleUrl + '" style="display:inline-block;background:#f0c040;color:#1a1a2e;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold">Ver vehiculo</a>'
            + '</div>'
            + '<div style="margin-top:20px;text-align:center;font-size:0.8rem;color:#999">'
            + '<p>Recibes este email porque activaste alertas en tus busquedas guardadas.</p>'
            + '<p>ALTORRA CARS — Tu proximo vehiculo te espera</p>'
            + '</div>'
            + '</div>'
            + '</body></html>';

        try {
            const transporter = createTransporter(user, pass);
            await transporter.sendMail({
                from: '"ALTORRA CARS" <' + user + '>',
                to: clientEmail,
                subject: 'Bajo de precio: ' + vehicleName + ' — ' + formattedNew,
                html: html
            });

            await db.collection('clientes').doc(clientDoc.id).update({ [todayKey]: true });
            emailsSent++;
            console.log('[PriceAlert] Sent to ' + clientEmail);
        } catch (err) {
            console.error('[PriceAlert] Failed for ' + clientEmail + ':', err.message);
        }
    }

    console.log('[PriceAlert] Summary: ' + clientsChecked + ' clients checked, '
        + clientsWithAlerts + ' with active alerts, '
        + emailsSent + ' email(s) sent for ' + vehicleName);
});

// ========== SEO PAGE GENERATION TRIGGER ==========

// Debounce: only trigger once per 5 minutes max
let _lastDispatchTime = 0;
const DEBOUNCE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Firestore trigger: when any vehicle document is created, updated, or deleted,
 * dispatch a GitHub Actions workflow to regenerate SEO pages.
 */
exports.onVehicleChange = onDocumentWritten({
    document: 'vehiculos/{vehicleId}',
    region: 'us-central1',
    secrets: [githubPat]
}, async (event) => {
    const now = Date.now();
    if (now - _lastDispatchTime < DEBOUNCE_MS) {
        console.log('[SEO] Skipped — debounce active (last dispatch ' + Math.round((now - _lastDispatchTime) / 1000) + 's ago)');
        return;
    }

    // Check if this is a meaningful change (not just a read)
    const before = event.data.before ? event.data.before.data() : null;
    const after = event.data.after ? event.data.after.data() : null;

    // ALL fields used by generate-vehicles.mjs to build OG tags, JSON-LD, and noscript content.
    // If ANY of these change, the static page must be regenerated.
    // Source: scripts/generate-vehicles.mjs — full audit of og:title, og:description, og:image,
    //         twitter:*, JSON-LD schema, noscript block, sitemap image tags, and slug generation.
    var SEO_FIELDS = [
        'marca',         // og:title, og:description, slug, JSON-LD name/brand, sitemap
        'modelo',        // og:title, og:description, slug, JSON-LD model, sitemap
        'year',          // og:title, og:description, slug, JSON-LD vehicleModelDate, sitemap
        'imagen',        // og:image, twitter:image, JSON-LD image, sitemap image, noscript
        'precio',        // og:description, JSON-LD offer price
        'precioOferta',  // og:description, JSON-LD offer price (takes precedence over precio)
        'estado',        // determines if page exists (only "disponible" gets a page)
        'descripcion',   // noscript SEO content
        'tipo',          // og:description, noscript
        'transmision',   // og:description, JSON-LD vehicleTransmission, noscript
        'kilometraje',   // og:description, JSON-LD mileageFromOdometer, noscript
        'combustible',   // JSON-LD fuelType, noscript
        'color',         // JSON-LD color, noscript
        'puertas',       // JSON-LD numberOfDoors
        'pasajeros',     // JSON-LD seatingCapacity
        'categoria'      // noscript content
    ];

    // For updates: skip if no SEO-relevant field changed
    if (before && after) {
        var changed = SEO_FIELDS.some(function(field) {
            return before[field] !== after[field];
        });
        if (!changed) {
            console.log('[SEO] Skipped — no SEO-relevant fields changed');
            return;
        }
        // Log which fields changed for debugging
        var changedFields = SEO_FIELDS.filter(function(field) {
            return before[field] !== after[field];
        });
        console.log('[SEO] Changed fields: ' + changedFields.join(', '));
    }

    const token = githubPat.value();
    if (!token) {
        console.error('[SEO] GITHUB_PAT secret not configured. Run: firebase functions:secrets:set GITHUB_PAT');
        return;
    }

    try {
        const response = await fetch('https://api.github.com/repos/altorracars/altorracars.github.io/dispatches', {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'vehicle-changed',
                client_payload: {
                    vehicleId: event.params.vehicleId,
                    action: !before ? 'created' : !after ? 'deleted' : 'updated',
                    timestamp: new Date().toISOString()
                }
            })
        });

        if (response.ok || response.status === 204) {
            _lastDispatchTime = now;
            console.log('[SEO] GitHub Actions dispatched for vehicle ' + event.params.vehicleId);
        } else {
            const body = await response.text();
            console.error('[SEO] GitHub API error ' + response.status + ': ' + body);
        }
    } catch (err) {
        console.error('[SEO] Failed to dispatch GitHub Actions:', err.message);
    }
});

/**
 * Callable function: manually trigger SEO page regeneration from admin panel.
 * Only super_admin can call this.
 */
exports.triggerSeoRegeneration = onCall({
    region: 'us-central1',
    invoker: 'public',
    cors: true,
    secrets: [githubPat]
}, async (request) => {
    // Verify super_admin
    if (!request.auth || !request.auth.uid) {
        throw new HttpsError('unauthenticated', 'Debes iniciar sesion.');
    }
    const callerDoc = await db.collection('usuarios').doc(request.auth.uid).get();
    if (!callerDoc.exists || callerDoc.data().rol !== 'super_admin') {
        throw new HttpsError('permission-denied', 'Solo Super Admin puede regenerar paginas SEO.');
    }

    // Token: primero desde el parámetro enviado por el admin panel (localStorage),
    // luego desde Firebase Secret Manager como fallback.
    const token = (request.data && request.data.githubPat) || githubPat.value();
    if (!token) {
        throw new HttpsError('failed-precondition',
            'GITHUB_PAT no configurado. Agrega el Token GitHub en el panel admin (seccion SEO) ' +
            'o ejecuta: firebase functions:secrets:set GITHUB_PAT');
    }

    try {
        const response = await fetch('https://api.github.com/repos/altorracars/altorracars.github.io/dispatches', {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event_type: 'vehicle-changed',
                client_payload: {
                    action: 'manual-trigger',
                    triggeredBy: request.auth.token.email || request.auth.uid,
                    timestamp: new Date().toISOString()
                }
            })
        });

        if (response.ok || response.status === 204) {
            return { success: true, message: 'Regeneracion de paginas SEO iniciada. Las paginas se actualizaran en ~2 minutos.' };
        } else {
            throw new HttpsError('internal', 'GitHub API error: ' + response.status);
        }
    } catch (err) {
        if (err instanceof HttpsError) throw err;
        throw new HttpsError('internal', 'Error al disparar regeneracion: ' + err.message);
    }
});
const callableOptionsV2 = {
    region: 'us-central1',
    invoker: 'public',
    cors: true
};

function mapAuthError(error, fallbackAction) {
    const code = error && error.code ? String(error.code) : '';
    const message = error && error.message ? String(error.message) : 'Sin detalles';

    if (code === 'auth/email-already-exists') {
        return new HttpsError('already-exists',
            'Este email ya tiene una cuenta en Firebase Auth. Eliminala primero desde Firebase Console si deseas re-crearla.');
    }

    if (code === 'auth/invalid-email') {
        return new HttpsError('invalid-argument', 'El formato del email no es valido.');
    }

    if (code === 'auth/weak-password' || code === 'auth/invalid-password') {
        return new HttpsError('invalid-argument', 'La contrasena no cumple los requisitos minimos.');
    }

    if (code === 'auth/operation-not-allowed') {
        return new HttpsError('failed-precondition',
            'El proveedor Email/Password no esta habilitado en Firebase Authentication.');
    }

    if (code === 'auth/insufficient-permission') {
        return new HttpsError('permission-denied',
            'La cuenta de servicio de Cloud Functions no tiene permisos de Firebase Auth Admin.');
    }

    return new HttpsError('internal',
        fallbackAction + ' (codigo: ' + (code || 'desconocido') + ').',
        { code: code || 'unknown', originalMessage: message });
}

async function verifySuperAdmin(auth) {
    if (!auth || !auth.uid) {
        throw new HttpsError('unauthenticated', 'Debes iniciar sesion.');
    }

    const callerDoc = await db.collection('usuarios').doc(auth.uid).get();

    if (!callerDoc.exists) {
        throw new HttpsError('permission-denied', 'No tienes un perfil de administrador.');
    }

    const callerData = callerDoc.data();
    if (callerData.rol !== 'super_admin') {
        throw new HttpsError('permission-denied', 'Solo un Super Admin puede realizar esta accion.');
    }

    return callerData;
}

function throwInputError(code) {
    if (code === '__INVALID_NAME__') {
        throw new HttpsError('invalid-argument', 'El nombre es obligatorio (minimo 2 caracteres).');
    }
    if (code === '__INVALID_EMAIL__') {
        throw new HttpsError('invalid-argument', 'El email no es valido.');
    }
    if (code === '__INVALID_PASSWORD__') {
        throw new HttpsError('invalid-argument', 'La contrasena debe tener al menos 6 caracteres.');
    }
    if (code === '__INVALID_ROLE__') {
        throw new HttpsError('invalid-argument', 'Rol invalido. Debe ser: super_admin, editor o viewer.');
    }
    if (code === '__ALREADY_EXISTS_FIRESTORE__') {
        throw new HttpsError('already-exists', 'Ya existe un usuario con ese email en el sistema.');
    }
}

async function createManagedUserCore(data, auth) {
    const { nombre, email, password, rol } = data;

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
        throw new Error('__INVALID_NAME__');
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        throw new Error('__INVALID_EMAIL__');
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
        throw new Error('__INVALID_PASSWORD__');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new Error('__INVALID_ROLE__');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingSnap = await db.collection('usuarios')
        .where('email', '==', normalizedEmail)
        .limit(1)
        .get();

    if (!existingSnap.empty) {
        throw new Error('__ALREADY_EXISTS_FIRESTORE__');
    }

    try {
        const userRecord = await admin.auth().createUser({
            email: normalizedEmail,
            password: password,
            displayName: nombre.trim()
        });

        await db.collection('usuarios').doc(userRecord.uid).set({
            nombre: nombre.trim(),
            email: normalizedEmail,
            rol: rol,
            estado: 'activo',
            uid: userRecord.uid,
            creadoEn: new Date().toISOString(),
            creadoPor: (auth && auth.token && auth.token.email) || auth.uid
        });

        return {
            success: true,
            uid: userRecord.uid,
            message: 'Usuario "' + nombre.trim() + '" creado exitosamente.'
        };
    } catch (error) {
        throw mapAuthError(error, 'No se pudo crear el usuario');
    }
}

// ========== CREATE MANAGED USER ==========
exports.createManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    try {
        return await createManagedUserCore(request.data || {}, request.auth);
    } catch (error) {
        if (error && error.message) {
            throwInputError(error.message);
        }
        throw error;
    }
});

// ========== DELETE MANAGED USER ==========
exports.deleteManagedUserV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const { uid } = request.data || {};

    if (!uid || typeof uid !== 'string') {
        throw new HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    if (uid === request.auth.uid) {
        throw new HttpsError('failed-precondition', 'No puedes eliminar tu propia cuenta.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (userDoc.exists) {
        await db.collection('usuarios').doc(uid).delete();
    }

    try {
        await admin.auth().deleteUser(uid);
    } catch (error) {
        if (error.code !== 'auth/user-not-found') {
            throw mapAuthError(error, 'El perfil se elimino, pero no se pudo eliminar la cuenta de Authentication');
        }
    }

    return {
        success: true,
        message: 'Usuario eliminado completamente (Auth + Firestore).'
    };
});

// ========== UPDATE USER ROLE ==========
exports.updateUserRoleV2 = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const { uid, nombre, rol } = request.data || {};

    if (!uid || typeof uid !== 'string') {
        throw new HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
    }

    const validRoles = ['super_admin', 'editor', 'viewer'];
    if (!rol || !validRoles.includes(rol)) {
        throw new HttpsError('invalid-argument', 'Rol invalido.');
    }

    const userDoc = await db.collection('usuarios').doc(uid).get();
    if (!userDoc.exists) {
        throw new HttpsError('not-found', 'Usuario no encontrado.');
    }

    const updateData = {
        rol: rol,
        actualizadoEn: new Date().toISOString(),
        actualizadoPor: (request.auth && request.auth.token && request.auth.token.email) || request.auth.uid
    };

    if (nombre && typeof nombre === 'string') {
        updateData.nombre = nombre.trim();
    }

    await db.collection('usuarios').doc(uid).update(updateData);

    return {
        success: true,
        message: 'Usuario actualizado.'
    };
});

// ═══════════════════════════════════════════════════════════════════════════
// FASE 3 — chatLLM: callable que conecta el Concierge con un LLM
// ═══════════════════════════════════════════════════════════════════════════
//
// Flujo:
//   1. Lee `knowledgeBase/_brain` (singleton con identidad, contexto,
//      instrucciones, reglas, modelo configurado por el admin).
//   2. Si _brain.enabled === false → retorna { disabled: true }, el cliente
//      hace fallback a rule-based.
//   3. Si LLM_API_KEY no está configurado → retorna { noKey: true }.
//   4. Lee inventario (vehiculos/) filtrando vendidos/reservados, top 30.
//   5. Compone system prompt + contexto + tools (function calling Phase 3.B).
//   6. Llama al provider LLM (anthropic / openai / google) via fetch nativo.
//   7. Rate limit por sessionId: max 60 calls/día (proteger costos).
//   8. Retorna { text, model, usage, source: 'llm' } o error.
//
// Provider abstraction: SDK nativo de Node 22 (fetch) — sin deps extras.
//

// Optimización 2026-05-06: tope de inventario reducido de 30 → 10
// Cada vehículo en el prompt cuesta ~80-150 tokens. Con 30 vehículos
// el system prompt llegaba a ~5000 tokens en cada turno. Bajar a 10
// reduce ~2000 tokens/turno (~30% menos coste de input antes del cache).
const RATE_LIMIT_PER_DAY = 30;          // antes 60 — protección anti-abuso
const MAX_INVENTORY_VEHICLES = 10;      // antes 30 — system prompt más liviano

/**
 * callAnthropic — Claude Messages API
 * docs: https://docs.anthropic.com/en/api/messages
 *
 * Prompt caching activado (2026-05-06):
 *   El system prompt se envía como bloque con cache_control:'ephemeral'.
 *   Anthropic guarda ese bloque en cache caliente por 5 minutos. Mientras
 *   esté caliente, llamadas siguientes pagan 0.10 USD/MTok en vez de
 *   1.00 USD/MTok (90% descuento) en la parte cacheada.
 *
 *   Solo se cachea la PARTE FIJA (system prompt). La conversation history
 *   sigue cobrándose full price porque cambia cada turno.
 *
 *   Cache write: cobra +25% (1.25 USD/MTok) la primera vez. Pero solo se
 *   paga UNA vez cada 5 min, así que el ahorro neto es enorme.
 *
 *   Mínimo 1024 tokens para cachear (Haiku/Sonnet). Nuestro system prompt
 *   con identidad+contexto+inventario(10)+reglas pesa ~2500-3500 tokens,
 *   bien por encima del mínimo.
 *
 *   Header anthropic-version 2023-06-01 ya soporta prompt caching stable
 *   (no requiere beta header).
 */
async function callAnthropic(apiKey, model, system, messages, temperature, maxTokens) {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: maxTokens,
            temperature: temperature,
            // Prompt caching: el system prompt es la parte fija que se reutiliza
            // entre turnos del mismo chat. Lo enviamos como bloque structured
            // con cache_control para que Anthropic lo cachee.
            system: [
                {
                    type: 'text',
                    text: system,
                    cache_control: { type: 'ephemeral' }
                }
            ],
            messages: messages
        })
    });
    if (!resp.ok) {
        const errBody = await resp.text();
        throw new Error('Anthropic ' + resp.status + ': ' + errBody.slice(0, 400));
    }
    const data = await resp.json();
    const text = (data.content && data.content[0] && data.content[0].text) || '';
    // data.usage incluye cache_creation_input_tokens (write) y
    // cache_read_input_tokens (read) cuando el caching aplica.
    // Los exponemos para que el cliente / admin pueda monitorearlo.
    return {
        text: text,
        usage: data.usage || null,
        model: data.model || model,
        stopReason: data.stop_reason || null
    };
}

/**
 * callOpenAI — Chat Completions API
 * docs: https://platform.openai.com/docs/api-reference/chat/create
 */
async function callOpenAI(apiKey, model, system, messages, temperature, maxTokens) {
    const fullMessages = [{ role: 'system', content: system }].concat(messages);
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: model,
            max_tokens: maxTokens,
            temperature: temperature,
            messages: fullMessages
        })
    });
    if (!resp.ok) {
        const errBody = await resp.text();
        throw new Error('OpenAI ' + resp.status + ': ' + errBody.slice(0, 400));
    }
    const data = await resp.json();
    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
    return {
        text: text,
        usage: data.usage || null,
        model: data.model || model,
        stopReason: data.choices && data.choices[0] && data.choices[0].finish_reason || null
    };
}

/**
 * callGoogle — Gemini generateContent API
 * docs: https://ai.google.dev/api/generate-content
 */
async function callGoogle(apiKey, model, system, messages, temperature, maxTokens) {
    // Gemini espera contents tipo: [{ role: 'user'|'model', parts: [{text: '...'}] }]
    // y el system instruction es separate.
    const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
    }));
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
        encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);
    const resp = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            contents: contents,
            systemInstruction: { parts: [{ text: system }] },
            generationConfig: {
                temperature: temperature,
                maxOutputTokens: maxTokens
            }
        })
    });
    if (!resp.ok) {
        const errBody = await resp.text();
        throw new Error('Google ' + resp.status + ': ' + errBody.slice(0, 400));
    }
    const data = await resp.json();
    const text = (data.candidates && data.candidates[0] &&
                  data.candidates[0].content && data.candidates[0].content.parts &&
                  data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) || '';
    return {
        text: text,
        usage: data.usageMetadata || null,
        model: model,
        stopReason: data.candidates && data.candidates[0] && data.candidates[0].finishReason || null
    };
}

/**
 * Construye el system prompt final inyectando identidad, contexto,
 * instrucciones, reglas y el inventario en tiempo real.
 */
function composeSystemPrompt(brain, inventory, chatSummary, sessionContext) {
    const id = brain.identidad || {};
    const ctx = brain.contexto || {};
    const valores = (ctx.valores || []).join(', ');
    const servicios = (ctx.servicios || []).map((s) => '- ' + s).join('\n');
    const reglas = (brain.reglas_seguridad || []).map((r) => '- ' + r).join('\n');

    let invSection = '';
    if (inventory && inventory.length > 0) {
        invSection = '\n\nINVENTARIO DISPONIBLE EN TIEMPO REAL (top ' + inventory.length + '):\n' +
            inventory.map((v, i) => {
                const precio = v.precioOferta || v.precio;
                const precioStr = precio ? '$' + (precio / 1e6).toFixed(1) + 'M' : 'consultar';
                return (i + 1) + '. ' + (v.marca || '?') + ' ' + (v.modelo || '') +
                    ' ' + (v.year || '') + ' — ' + precioStr +
                    (v.kilometraje ? ' · ' + v.kilometraje + ' km' : '') +
                    (v.categoria ? ' · ' + v.categoria : '') +
                    (v.estado === 'reservado' ? ' (RESERVADO)' : '') +
                    (v.id ? ' [id:' + v.id + ']' : '');
            }).join('\n');
    }

    // F.1 — Summary previo si existe (chats largos comprimidos)
    let summarySection = '';
    if (chatSummary) {
        summarySection = '\n\nRESUMEN DE LA CONVERSACIÓN HASTA AHORA:\n' + chatSummary;
    }

    // Contexto de sesión (vehículo de origen, asesor activo, perfil del cliente)
    let sessionSection = '';
    if (sessionContext) {
        const bits = [];
        if (sessionContext.profile && sessionContext.profile.nombre) {
            bits.push('Cliente: ' + sessionContext.profile.nombre +
                (sessionContext.profile.apellido ? ' ' + sessionContext.profile.apellido : '') +
                (sessionContext.profile.cedula ? ' (CC: ' + sessionContext.profile.cedula + ')' : ''));
        }
        if (sessionContext.sourceVehicleId) {
            bits.push('Cliente entró desde la ficha del vehículo ID: ' + sessionContext.sourceVehicleId);
        }
        if (sessionContext.activeAsesor && sessionContext.activeAsesor.nombre) {
            bits.push('Asesor humano activo en este chat: ' + sessionContext.activeAsesor.nombre);
        }
        if (bits.length > 0) {
            sessionSection = '\n\nCONTEXTO DE ESTA CONVERSACIÓN:\n' + bits.map((b) => '- ' + b).join('\n');
        }
    }

    return [
        id.personalidad || 'Soy ALTOR, asistente virtual de Altorra Cars.',
        '',
        'CONTEXTO DEL NEGOCIO:',
        ctx.descripcion || '',
        valores ? 'NUESTROS VALORES: ' + valores : '',
        servicios ? 'SERVICIOS:\n' + servicios : '',
        '',
        'INSTRUCCIONES:',
        brain.instrucciones || '',
        '',
        reglas ? 'REGLAS DE SEGURIDAD (INVIOLABLES):\n' + reglas : '',
        sessionSection,
        summarySection,
        invSection,
        '',
        id.tono ? 'TONO: ' + id.tono : ''
    ].filter(Boolean).join('\n').trim();
}

/**
 * Lee el inventario disponible (no vendido), ordenado por destacado y
 * fecha de ingreso. Cap a top N para mantener el system prompt
 * dentro de un budget razonable.
 */
async function fetchInventoryForLLM(limit) {
    try {
        const snap = await db.collection('vehiculos')
            .where('estado', 'in', ['disponible', 'reservado'])
            .limit(100)
            .get();
        const items = [];
        snap.forEach((doc) => {
            const v = doc.data();
            items.push({
                id: doc.id,
                marca: v.marca,
                modelo: v.modelo,
                year: v.year,
                precio: v.precio,
                precioOferta: v.precioOferta,
                kilometraje: v.kilometraje,
                categoria: v.categoria,
                estado: v.estado,
                destacado: !!v.destacado,
                createdAt: v.createdAt || v.creadoEn || ''
            });
        });
        // Sort: destacados primero, luego por fecha desc
        items.sort((a, b) => {
            if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
            const at = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
            const bt = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
            return bt - at;
        });
        return items.slice(0, limit);
    } catch (err) {
        console.warn('[chatLLM] Failed to fetch inventory:', err.message);
        return [];
    }
}

/**
 * Rate limit per session — max N calls/día. Track con doc en
 * Firestore: llmRateLimit/{sessionId} con {count, day}.
 * Reset diario implícito al cambiar de día.
 */
async function checkRateLimit(sessionId) {
    if (!sessionId) return true; // sin sessionId no podemos rate-limit
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const ref = db.collection('llmRateLimit').doc(sessionId);
    const snap = await ref.get();
    if (!snap.exists) {
        await ref.set({ count: 1, day: today, lastAt: new Date().toISOString() });
        return true;
    }
    const data = snap.data();
    if (data.day !== today) {
        // nuevo día → reset
        await ref.set({ count: 1, day: today, lastAt: new Date().toISOString() });
        return true;
    }
    if ((data.count || 0) >= RATE_LIMIT_PER_DAY) return false;
    await ref.update({
        count: admin.firestore.FieldValue.increment(1),
        lastAt: new Date().toISOString()
    });
    return true;
}

exports.chatLLM = onCall({
    region: 'us-central1',
    secrets: [llmApiKey],
    cors: true,
    timeoutSeconds: 30,
    memory: '512MiB'
}, async (request) => {
    const data = request.data || {};
    const messages = Array.isArray(data.messages) ? data.messages : [];
    const sessionId = data.sessionId || null;

    if (messages.length === 0) {
        throw new HttpsError('invalid-argument', 'messages is required');
    }

    // 1. Leer doc _brain
    let brain;
    try {
        const brainSnap = await db.doc('knowledgeBase/_brain').get();
        brain = brainSnap.exists ? brainSnap.data() : null;
    } catch (err) {
        console.warn('[chatLLM] No se pudo leer _brain:', err.message);
        return { disabled: true, reason: 'brain-read-error' };
    }

    if (!brain || !brain.enabled) {
        return { disabled: true, reason: 'brain-disabled' };
    }

    // 2. Verificar API key
    let apiKey;
    try {
        apiKey = llmApiKey.value();
    } catch (err) {
        return { noKey: true, reason: 'secret-not-set' };
    }
    if (!apiKey) return { noKey: true, reason: 'empty-secret' };

    // 3. Rate limit
    const allowed = await checkRateLimit(sessionId);
    if (!allowed) {
        return {
            text: 'Has alcanzado el límite diario de respuestas automáticas. Te conecto con un asesor humano.',
            cta: { label: 'Hablar con asesor', action: 'escalate' },
            rateLimited: true
        };
    }

    // 4. Inventario en tiempo real
    const inventory = await fetchInventoryForLLM(MAX_INVENTORY_VEHICLES);

    // 4.5 F.1 — Cargar summary previo del chat si existe (chats largos)
    let chatSummary = null;
    let sessionContext = null;
    if (sessionId) {
        try {
            const chatSnap = await db.collection('conciergeChats').doc(sessionId).get();
            if (chatSnap.exists) {
                const c = chatSnap.data();
                chatSummary = c.summary || null;
            }
        } catch (e) { /* silencio */ }
    }

    // Pasar contexto de sesión desde el cliente para que el LLM sepa el
    // vehículo de origen, perfil del cliente, asesor activo, etc.
    sessionContext = {
        sourceVehicleId: data.sourceVehicleId || null,
        sourcePage: data.sourcePage || null,
        profile: data.profile || null,
        activeAsesor: data.activeAsesor || null
    };

    // 5. Compose system prompt (con tool/CTA hints)
    const system = composeSystemPrompt(brain, inventory, chatSummary, sessionContext) +
        // F.2 — Function-calling lite: el LLM puede sugerir un CTA accionable
        // al final de su respuesta usando un tag especial que el cliente
        // parsea. No es full tool-use (que requeriría re-llamada) pero
        // permite acciones útiles sin gastar tokens extras.
        '\n\n--- ACCIONES DISPONIBLES (CTAs) ---\n' +
        'Si tu respuesta naturalmente sugiere una acción, podés agregar UN tag al FINAL:\n' +
        '  [CTA:Texto del botón:action_id]\n' +
        'action_id válidos:\n' +
        '  - escalate: conectar con asesor humano (mode=live, crea registro en Firestore)\n' +
        '  - goto-busqueda: enviar al catálogo (busqueda.html)\n' +
        '  - goto-simulador: enviar al simulador de crédito (simulador-credito.html)\n' +
        '  - open-modal-vende: abrir modal de "Vende tu auto"\n' +
        '  - open-modal-financiacion: abrir modal de financiación\n' +
        'Ejemplo correcto: "Te paso al simulador para que veas tu cuota. [CTA:Ir al simulador:goto-simulador]"\n' +
        'Reglas estrictas:\n' +
        '  - Máximo UN tag por respuesta.\n' +
        '  - Solo úsalo si el cliente claramente se beneficia de la acción.\n' +
        '  - NO inventes action_ids que no estén en la lista.\n' +
        '  - NO uses el tag para preguntas genéricas (ej. "¿quieres ver más?" sin acción concreta).';

    // 6. Sanitize messages: solo role + content, alternar correctamente
    const cleanMessages = messages
        .filter((m) => m && m.role && m.content && typeof m.content === 'string')
        .map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content.slice(0, 4000) // cap por mensaje para safety
        }));

    if (cleanMessages.length === 0 || cleanMessages[cleanMessages.length - 1].role !== 'user') {
        throw new HttpsError('invalid-argument', 'last message must be from user');
    }

    // 7. Llamar al provider
    const provider = brain.llmProvider || 'anthropic';
    const model = brain.llmModel || 'claude-haiku-4-5';
    const temperature = typeof brain.llmTemperature === 'number' ? brain.llmTemperature : 0.7;
    const maxTokens = brain.maxTokens || 600;

    let result;
    try {
        if (provider === 'openai') {
            result = await callOpenAI(apiKey, model, system, cleanMessages, temperature, maxTokens);
        } else if (provider === 'google') {
            result = await callGoogle(apiKey, model, system, cleanMessages, temperature, maxTokens);
        } else {
            // default anthropic
            result = await callAnthropic(apiKey, model, system, cleanMessages, temperature, maxTokens);
        }
    } catch (err) {
        console.error('[chatLLM] LLM call failed:', err.message);
        // Devolver disabled para que cliente haga fallback (no propagar error)
        return { disabled: true, reason: 'llm-call-failed', error: err.message.slice(0, 200) };
    }

    // F.2 — Parsear el tag [CTA:label:action] si el LLM lo añadió al final.
    // Whitelist de actions para evitar inyecciones.
    const ALLOWED_CTAS = ['escalate', 'goto-busqueda', 'goto-simulador',
                          'open-modal-vende', 'open-modal-financiacion'];
    let finalText = result.text || '';
    let finalCta = null;
    const ctaMatch = finalText.match(/\[CTA:([^:\]]+):([a-z\-]+)\]\s*$/i);
    if (ctaMatch) {
        const label = ctaMatch[1].trim();
        const action = ctaMatch[2].trim();
        if (ALLOWED_CTAS.indexOf(action) !== -1 && label.length > 0 && label.length < 60) {
            finalCta = { label: label, action: action };
            // Remover el tag del text para que no aparezca al cliente
            finalText = finalText.replace(/\[CTA:[^:\]]+:[a-z\-]+\]\s*$/i, '').trim();
        }
    }

    return {
        text: finalText,
        cta: finalCta,
        model: result.model,
        usage: result.usage,
        provider: provider,
        source: 'llm'
    };
});

// ═══════════════════════════════════════════════════════════════════════════
// FASE 3 — F.1 Conversation Summary
// ═══════════════════════════════════════════════════════════════════════════
//
// Trigger: cuando un chat alcanza N turnos del cliente (cada 10), comprime
// los mensajes viejos en un summary que el LLM usa en lugar de reprocesar
// todos los turnos. Mantiene coherencia en chats largos sin gastar tokens
// innecesarios.
//
// Modelo: el doc parent conciergeChats/{sid} tiene `summary` (string) +
// `summaryUpToTurn` (int). chatLLM lo lee si existe y lo inyecta al
// system prompt como "RESUMEN PREVIO".
//
// Trigger: onDocumentWritten en conciergeChats/{sid}/messages/{mid}.
// Si el conteo de mensajes user pasa un múltiplo de 10, dispara summarize.

const SUMMARY_TRIGGER_EVERY = 10;

exports.summarizeChat = onCall({
    region: 'us-central1',
    secrets: [llmApiKey],
    cors: true,
    timeoutSeconds: 30,
    memory: '512MiB'
}, async (request) => {
    // Solo editor+ puede invocar manualmente desde el admin
    const auth = request.auth;
    if (!auth) throw new HttpsError('unauthenticated', 'Must be authenticated');

    const userDoc = await db.collection('usuarios').doc(auth.uid).get();
    if (!userDoc.exists) throw new HttpsError('permission-denied', 'No tienes permisos');
    const role = userDoc.data().rol;
    if (role !== 'super_admin' && role !== 'editor') {
        throw new HttpsError('permission-denied', 'Solo editor+ puede resumir chats');
    }

    const sessionId = request.data && request.data.sessionId;
    if (!sessionId) throw new HttpsError('invalid-argument', 'sessionId required');

    return await summarizeChatBySessionId(sessionId);
});

/**
 * Comprime los mensajes user/asesor de un chat en un summary corto
 * (3-5 líneas) que captura: identidad del cliente, intereses, decisiones
 * tomadas, próximos pasos.
 */
async function summarizeChatBySessionId(sessionId) {
    let apiKey;
    try { apiKey = llmApiKey.value(); } catch (err) { return { skipped: true, reason: 'no-key' }; }
    if (!apiKey) return { skipped: true, reason: 'no-key' };

    const brainSnap = await db.doc('knowledgeBase/_brain').get();
    if (!brainSnap.exists) return { skipped: true, reason: 'no-brain' };
    const brain = brainSnap.data();
    if (!brain.enabled) return { skipped: true, reason: 'brain-disabled' };

    // Cargar todos los mensajes del chat ordenados
    const msgsSnap = await db.collection('conciergeChats').doc(sessionId)
        .collection('messages').orderBy('timestamp', 'asc').get();
    const allMsgs = [];
    msgsSnap.forEach((doc) => {
        const d = doc.data();
        if (d.from === 'user' || d.from === 'bot' || d.from === 'asesor') {
            allMsgs.push({ from: d.from, text: d.text, ts: d.timestamp });
        }
    });
    if (allMsgs.length < SUMMARY_TRIGGER_EVERY) {
        return { skipped: true, reason: 'too-few-messages', count: allMsgs.length };
    }

    // Construir el prompt de summarization
    const conversation = allMsgs.map((m) => {
        const speaker = m.from === 'user' ? 'CLIENTE' :
                        m.from === 'asesor' ? 'ASESOR' : 'BOT';
        return speaker + ': ' + m.text;
    }).join('\n');

    const summarySystem = 'Eres un asistente que resume conversaciones de ventas de autos. ' +
        'Tu salida debe ser un resumen MUY breve (3-5 líneas) en español, capturando:\n' +
        '1. Identidad y datos de contacto del cliente (si los hay)\n' +
        '2. Lo que busca (marca, modelo, presupuesto, necesidades)\n' +
        '3. Decisiones o compromisos tomados (citas, cotizaciones)\n' +
        '4. Próximo paso pendiente\n' +
        'NO inventes nada. Si algo no se mencionó, omítelo.';

    const summaryUserMsg = 'Resumí esta conversación:\n\n' + conversation;

    const provider = brain.llmProvider || 'anthropic';
    const model = brain.llmModel || 'claude-haiku-4-5';

    let result;
    try {
        const messages = [{ role: 'user', content: summaryUserMsg }];
        if (provider === 'openai') {
            result = await callOpenAI(apiKey, model, summarySystem, messages, 0.3, 400);
        } else if (provider === 'google') {
            result = await callGoogle(apiKey, model, summarySystem, messages, 0.3, 400);
        } else {
            result = await callAnthropic(apiKey, model, summarySystem, messages, 0.3, 400);
        }
    } catch (err) {
        console.warn('[summarizeChat] LLM failed:', err.message);
        return { skipped: true, reason: 'llm-failed', error: err.message.slice(0, 200) };
    }

    const summary = (result.text || '').trim();
    if (!summary) return { skipped: true, reason: 'empty-summary' };

    await db.collection('conciergeChats').doc(sessionId).set({
        summary: summary,
        summaryUpToTurn: allMsgs.length,
        summaryUpdatedAt: new Date().toISOString(),
        summaryModel: result.model || model
    }, { merge: true });

    return {
        success: true,
        summary: summary,
        turnsAnalyzed: allMsgs.length,
        usage: result.usage
    };
}

/**
 * Trigger automático: cada vez que se agrega un mensaje a la subcolección
 * messages/, contamos los turnos del cliente. Si pasamos un múltiplo de
 * SUMMARY_TRIGGER_EVERY (10, 20, 30…) y todavía no hay summary actualizado
 * para ese turn count, disparamos summarize.
 *
 * Idempotente: si summaryUpToTurn ya >= newCount, skip.
 */
exports.onConciergeMessageAdded = onDocumentCreated({
    document: 'conciergeChats/{sessionId}/messages/{messageId}',
    region: 'us-central1',
    secrets: [llmApiKey],
    timeoutSeconds: 60,
    memory: '512MiB'
}, async (event) => {
    const sessionId = event.params.sessionId;
    if (!sessionId) return;

    // Solo procesar mensajes user (los del asesor/bot/system NO triggean summary)
    const data = event.data && event.data.data();
    if (!data || data.from !== 'user') return;

    // Contar mensajes user totales en el chat
    const msgsSnap = await db.collection('conciergeChats').doc(sessionId)
        .collection('messages')
        .where('from', '==', 'user')
        .get();
    const userTurns = msgsSnap.size;

    // Solo summarize cuando llegamos a múltiplo de SUMMARY_TRIGGER_EVERY
    if (userTurns < SUMMARY_TRIGGER_EVERY) return;
    if (userTurns % SUMMARY_TRIGGER_EVERY !== 0) return;

    // Idempotencia: si ya tenemos summary para este turn count, skip
    const chatSnap = await db.collection('conciergeChats').doc(sessionId).get();
    if (!chatSnap.exists) return;
    const chat = chatSnap.data();
    if ((chat.summaryUpToTurn || 0) >= userTurns) return;

    try {
        const result = await summarizeChatBySessionId(sessionId);
        if (result.success) {
            console.log('[summarizeChat] auto-summary @ turn', userTurns, 'sid', sessionId);
        }
    } catch (err) {
        console.warn('[summarizeChat] auto-trigger failed:', err.message);
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// FASE 3 — F.3 Proactive Engagement Triggers
// ═══════════════════════════════════════════════════════════════════════════
//
// Scheduled function que corre cada 5 minutos escaneando sesiones activas
// y enviando mensajes proactivos del bot al chat según señales:
//
// - Cliente lleva 90s+ sin escribir y el bot fue el último en hablar →
//   nada (no spam)
// - Cliente abrió chat pero no envió mensaje en 3 min → engagement message
// - Cliente registrado vuelve después de 7+ días → mensaje "¿Encontraste lo que buscabas?"
//
// Estos mensajes se escriben en conciergeChats/{sid}/messages/ con
// from='bot' y proactive=true. Aparecen en el chat del cliente vía
// onSnapshot del listener existente.
//
// Anti-spam: cada chat puede recibir máximo 1 proactive/día. Trackeado
// con campo lastProactiveAt en el doc parent.
//

const PROACTIVE_MIN_INTERVAL_HOURS = 24; // máx 1 proactive/chat/día
const PROACTIVE_INACTIVITY_THRESHOLD_MIN = 3; // chat abierto sin actividad 3min
const PROACTIVE_RETURNING_THRESHOLD_DAYS = 7; // cliente vuelve tras N días

/**
 * Ejecuta cada 5 minutos. Escanea conciergeChats con `mode='bot'` (no live)
 * y `status` distinto de 'closed'. Aplica heurísticas y envía proactives
 * cuando corresponde.
 *
 * Costo: una pasada toca ~50 chats activos típicos. Cada proactive escribe
 * 2 docs (mensaje + update parent). En tier free de Firestore este costo
 * es despreciable.
 */
// ═══════════════════════════════════════════════════════════════════════════
// §23 FASE 5 — onConciergeChatCreated: asigna radicado único
// ═══════════════════════════════════════════════════════════════════════════
//
// Trigger: cuando se crea un nuevo doc en conciergeChats/{sid}, le asignamos
// un número de radicado humano-legible: `REQ-YYYYMM-XXXX` (ej. REQ-202605-0042).
//
// Generación atómica vía transaction sobre `config/counters_YYYYMM`. Counter
// reinicia cada mes (XXXX vuelve a 0001) → reportes mensuales naturales.
//
// Idempotencia: si `data.radicado` ya existe, skip (escenario raro: re-trigger).
//
// historicalUserKey: group key normalizado (email lowercase, fallback uid)
// para agrupar tickets de un mismo cliente sin pisarlos. Se usa en queries
// de bandeja admin para mostrar "tickets históricos" del cliente.
//
exports.onConciergeChatCreated = onDocumentCreated({
    document: 'conciergeChats/{sessionId}',
    region: 'us-central1',
    timeoutSeconds: 30,
    memory: '256MiB'
}, async (event) => {
    const data = event.data && event.data.data();
    if (!data) return;
    if (data.radicado) return; // ya tiene radicado (idempotency)

    const yearMonth = new Date().toISOString().slice(0, 7).replace('-', ''); // 202605
    const counterRef = db.doc(`config/counters_${yearMonth}`);

    let radicado;
    try {
        radicado = await db.runTransaction(async (tx) => {
            const snap = await tx.get(counterRef);
            const currentSeq = (snap.exists && snap.data().radicadoSeq) || 0;
            const newSeq = currentSeq + 1;
            tx.set(counterRef, { radicadoSeq: newSeq, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
            return `REQ-${yearMonth}-${String(newSeq).padStart(4, '0')}`;
        });
    } catch (err) {
        console.error('[onConciergeChatCreated] radicado transaction failed:', err.message);
        return;
    }

    // historicalUserKey: agrupa tickets del mismo cliente (preferimos email,
    // fallback uid; null para anónimos sin identificar — esos se muestran
    // independientes en la bandeja sin agrupación).
    const historicalUserKey =
        (data.userEmail && String(data.userEmail).toLowerCase().trim()) ||
        data.userId ||
        null;

    try {
        await event.data.ref.update({
            radicado: radicado,
            radicadoAt: new Date().toISOString(),
            historicalUserKey: historicalUserKey
        });
        console.log(`[onConciergeChatCreated] Asignado ${radicado} a ${event.params.sessionId}`);
    } catch (err) {
        console.error('[onConciergeChatCreated] update failed:', err.message);
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// §23 FASE 2 — Workload Aggregator (recalculateWorkload)
// ═══════════════════════════════════════════════════════════════════════════
//
// Calcula el estado del equipo de asesores y lo persiste en `system/workload`
// como singleton. Los clientes (Concierge) y el admin leen este doc con UN
// solo listener compartido — ahorra ~99.8% de reads vs cliente-side calc.
//
// Triggers:
//   1. Firestore onWrite('conciergeChats/{sid}') — chat creado/actualizado
//   2. onSchedule every 1 minutes — safety net + captura cambios de
//      RTDB presence (no usamos RTDB trigger para evitar ruido del
//      heartbeat de presence cada 2 min)
//
// Datos cruzados:
//   - RTDB /presence con online=true → asesores online
//   - Firestore conciergeChats with mode in ['queue','live'] AND status != 'closed'
//     → chats activos para count por claimedBy
//
// Output: system/workload con shape:
//   {
//     asesoresOnline: int,
//     asesoresAvailable: int,        // online + claimedChats < 3
//     asesoresSaturated: int,        // online + claimedChats >= 3
//     queueLength: int,              // mode='queue' AND claimedBy=null
//     avgWaitMinutes: float,
//     longestWaitMinutes: float,
//     activeChatsByUid: {uid: count},
//     updatedAt: ISO
//   }
//
const SATURATION_THRESHOLD = 3;  // chats simultáneos máx por asesor "available"

async function _computeWorkload() {
    // 1. Lee asesores online de RTDB presence
    // §77 Sprint S5 — Distinguir 'online' vs 'away':
    //   - asesoresOnline: uid con AL MENOS UNA session status='online' (o sin status, retrocompat)
    //   - asesoresAway: uid SIN session online PERO con session status='away'
    //   - Ambos sets son disjuntos (away se descarta si hay alguna online del mismo uid)
    let asesoresOnline = [];
    let asesoresAway = [];
    try {
        const rtdb = admin.database();
        const snap = await rtdb.ref('/presence').orderByChild('online').equalTo(true).once('value');
        const data = snap.val() || {};
        // Bucket por uid con bandera de "tiene online activo"
        const uidStatusMap = {}; // {uid: 'online'|'away'} — last write wins por sesión
        Object.keys(data).forEach((sessionId) => {
            const entry = data[sessionId];
            if (entry && entry.uid) {
                // Filtrar stale: lastSeen > 5 min ago se considera offline
                const lastSeen = entry.lastSeen || 0;
                const fiveMinAgo = Date.now() - 5 * 60 * 1000;
                if (lastSeen > fiveMinAgo) {
                    // §77 — status field NUEVO. Sin status → asume 'online' (retrocompat)
                    const sessionStatus = entry.status === 'away' ? 'away' : 'online';
                    if (sessionStatus === 'online') {
                        // online gana siempre (uno online basta)
                        uidStatusMap[entry.uid] = 'online';
                    } else if (!uidStatusMap[entry.uid]) {
                        // away solo si no tenemos ya una online registrada
                        uidStatusMap[entry.uid] = 'away';
                    }
                }
            }
        });
        Object.keys(uidStatusMap).forEach((uid) => {
            if (uidStatusMap[uid] === 'online') asesoresOnline.push(uid);
            else if (uidStatusMap[uid] === 'away') asesoresAway.push(uid);
        });
    } catch (err) {
        console.warn('[recalculateWorkload] RTDB read failed:', err.message);
    }

    // 2. Lee chats activos (queue + live, no closed)
    let activeChatsByUid = {};
    let queueLength = 0;
    let longestWaitMs = 0;
    let totalWaitMs = 0;
    let queueCount = 0;
    try {
        // Query: chats con mode in ['queue','live'] y status != 'closed'
        // Firestore no soporta != combinado con in en una sola query → 2 queries
        const queueSnap = await db.collection('conciergeChats')
            .where('mode', '==', 'queue')
            .get();
        const liveSnap = await db.collection('conciergeChats')
            .where('mode', '==', 'live')
            .get();

        const now = Date.now();
        const processSnap = (snap) => {
            snap.forEach((doc) => {
                const c = doc.data() || {};
                if (c.status === 'closed') return; // double-check

                if (c.mode === 'queue' && !c.claimedBy) {
                    queueLength++;
                    if (c.queueEnteredAt) {
                        const waitMs = now - new Date(c.queueEnteredAt).getTime();
                        if (waitMs > 0) {
                            totalWaitMs += waitMs;
                            queueCount++;
                            if (waitMs > longestWaitMs) longestWaitMs = waitMs;
                        }
                    }
                }
                if (c.claimedBy) {
                    activeChatsByUid[c.claimedBy] = (activeChatsByUid[c.claimedBy] || 0) + 1;
                }
            });
        };
        processSnap(queueSnap);
        processSnap(liveSnap);
    } catch (err) {
        console.warn('[recalculateWorkload] Firestore read failed:', err.message);
    }

    // 3. Categorize asesores online (away NO cuenta como available)
    let asesoresAvailable = 0;
    let asesoresSaturated = 0;
    asesoresOnline.forEach((uid) => {
        const chatsCount = activeChatsByUid[uid] || 0;
        if (chatsCount < SATURATION_THRESHOLD) asesoresAvailable++;
        else asesoresSaturated++;
    });

    // 4. Compute averages
    const avgWaitMinutes = queueCount > 0 ? (totalWaitMs / queueCount) / 60000 : 0;
    const longestWaitMinutes = longestWaitMs / 60000;

    const workload = {
        asesoresOnline: asesoresOnline.length,
        asesoresAvailable: asesoresAvailable,
        asesoresSaturated: asesoresSaturated,
        // §77 Sprint S5 — count de asesores away (logueados pero idle/tab oculto).
        // Cuentan como "no available" para queue, pero el cliente puede ver que
        // hay asesores cerca (vs offline total).
        asesoresAway: asesoresAway.length,
        queueLength: queueLength,
        avgWaitMinutes: Math.round(avgWaitMinutes * 10) / 10,
        longestWaitMinutes: Math.round(longestWaitMinutes * 10) / 10,
        activeChatsByUid: activeChatsByUid,
        updatedAt: new Date().toISOString()
    };

    await db.doc('system/workload').set(workload, { merge: true });
    return workload;
}

// Trigger 1: cuando un chat se crea o cambia mode/claimedBy/status
exports.recalculateWorkloadOnChatChange = onDocumentWritten({
    document: 'conciergeChats/{sessionId}',
    region: 'us-central1',
    timeoutSeconds: 30,
    memory: '256MiB'
}, async (event) => {
    const before = event.data.before && event.data.before.data();
    const after = event.data.after && event.data.after.data();
    // Skip si solo cambiaron campos no relevantes (lastMessage, unread, etc.)
    if (before && after) {
        const relevantChanged =
            before.mode !== after.mode ||
            before.claimedBy !== after.claimedBy ||
            before.status !== after.status;
        if (!relevantChanged) return; // no afecta workload
    }
    try { await _computeWorkload(); }
    catch (err) { console.warn('[recalculateWorkload] failed:', err.message); }
});

// Trigger 2: schedule cada 1 min como safety net (cubre cambios de RTDB
// presence sin disparar trigger Firestore)
exports.recalculateWorkloadScheduled = onSchedule({
    schedule: 'every 1 minutes',
    region: 'us-central1',
    timeoutSeconds: 30,
    memory: '256MiB'
}, async (event) => {
    try { await _computeWorkload(); }
    catch (err) { console.warn('[recalculateWorkload scheduled] failed:', err.message); }
});

// ═══════════════════════════════════════════════════════════════════════════
// §23 FASE 4 — onChatEscalated: FCM Web Push a asesores cuando chat entra a queue
// ═══════════════════════════════════════════════════════════════════════════
//
// Trigger: cuando el `mode` de un conciergeChat pasa a 'queue' (escalado),
// enviamos una notificación push a los celulares de TODOS los editores y
// super_admins que tengan fcmTokens registrados.
//
// §50 — Eliminado el filtro por asesoresAvailable. Cliente pidió que cada
// vez que un cliente solicite asesor SIEMPRE se notifique desde el
// minuto 0, independientemente de si hay asesores online o no. El asesor
// con panel abierto recibe el push igual (es solo un toast adicional —
// no bloquea su flow).
//
// Mantenemos cooldown 5 min por chat para evitar duplicados si el chat
// vuelve a queue mode (escalación múltiple en una misma sesión).
//
// Auto-pruning: si FCM retorna error de token inválido
// (messaging/registration-token-not-registered o invalid-argument),
// removemos el token del array fcmTokens del asesor.
//
// §99 (2026-05-20) — onDocumentUpdated → onDocumentWritten + condición de
// ESTADO (no transición). Causa raíz del bug "no notifica nada": cuando el
// cliente abre el bot y clickea "Hablar con asesor" SIN chatear primero,
// ensureFirestoreChatDoc CREA el doc ya con mode='queue' (un CREATE). El
// trigger onUpdate solo dispara con before≠after, NUNCA con CREATE → push
// jamás se enviaba en la escalación directa (el caso más común). Es el mismo
// bug que §54/§56 arreglaron para onChatEscalatedTelegram. Mirror exacto:
// onWrite + nowInQueue + single-shot notifiedFcmAt + esperar radicado.
// Región us-central1 SE MANTIENE (onConciergeChatCreated + workload usan la
// misma y funcionan — no es problema cross-region, solo era el trigger type).
exports.onChatEscalated = onDocumentWritten({
    document: 'conciergeChats/{sessionId}',
    region: 'us-central1',
    timeoutSeconds: 60,
    memory: '256MiB'
}, async (event) => {
    const sessionId = event.params.sessionId;
    console.log('[onChatEscalated] §99 INVOKED — sessionId:', sessionId);

    if (!event.data) {
        console.warn('[onChatEscalated] event.data null. Skip.');
        return;
    }
    const before = event.data.before && event.data.before.exists ? event.data.before.data() : null;
    const after = event.data.after && event.data.after.exists ? event.data.after.data() : null;

    const beforeMode = before ? before.mode : '(no-before)';
    const afterMode = after ? after.mode : '(deleted)';
    console.log('[onChatEscalated] mode transition:', beforeMode, '→', afterMode);

    if (!after) {
        console.log('[onChatEscalated] Doc deleted. Skip.');
        return;
    }

    // §99 — condición de ESTADO (mirror §56): el chat está en cola,
    // no se notificó aún, y ya tiene radicado canónico.
    const nowInQueue = after.mode === 'queue';
    if (!nowInQueue) {
        console.log('[onChatEscalated] Not in queue. Skip.');
        return;
    }

    // Single-shot anti-duplicado (mirror §56). Con onWrite el trigger
    // dispara en CADA escritura del doc parent (lastMessageAt, read
    // receipts §76, etc.). notifiedFcmAt garantiza 1 sola push por chat.
    if (after.notifiedFcmAt) {
        console.log('[onChatEscalated] Already notified at', after.notifiedFcmAt, '. Skip.');
        return;
    }

    // §99 — Esperar al radicado canónico (mirror §56). onConciergeChatCreated
    // lo asigna en breve; ese write re-dispara este trigger con radicado ya
    // presente. Evita enviar el push con el slice feo del sessionId.
    if (!after.radicado) {
        console.log('[onChatEscalated] Pending radicado canónico. Skip (will retrigger).');
        return;
    }
    console.log('[onChatEscalated] ✓ Chat in queue with radicado:', after.radicado, '. Sending FCM push...');

    // Recolectar fcmTokens de TODOS los editores + super_admins
    const usuariosSnap = await db.collection('usuarios')
        .where('rol', 'in', ['super_admin', 'editor'])
        .get();

    const tokensByUid = {};
    usuariosSnap.forEach((doc) => {
        const u = doc.data() || {};
        if (Array.isArray(u.fcmTokens) && u.fcmTokens.length > 0) {
            tokensByUid[doc.id] = u.fcmTokens.filter(t => t && t.token);
        }
    });

    const allTokenStrings = [];
    Object.keys(tokensByUid).forEach((uid) => {
        tokensByUid[uid].forEach((t) => allTokenStrings.push({ uid, token: t.token }));
    });

    if (allTokenStrings.length === 0) {
        console.log('[onChatEscalated] no tokens FCM registrados — skip');
        return;
    }

    // Construir payload — §99 radicado garantizado por el guard de arriba
    const radicado = after.radicado;
    const userName = after.userNombre || after.userEmail || 'Cliente anónimo';
    const reason = after.escalationReason || 'manual';
    const message = {
        notification: {
            title: '🚨 Cliente esperando — Altorra Cars',
            body: radicado + ' · ' + userName + ' · razón: ' + reason
        },
        data: {
            sessionId: event.params.sessionId,
            radicado: radicado,
            click_action: 'https://altorracars.github.io/admin.html#concierge'
        },
        webpush: {
            fcmOptions: {
                link: 'https://altorracars.github.io/admin.html#concierge'
            },
            notification: {
                requireInteraction: true,
                icon: '/ALTOR.png',
                badge: '/ALTOR.png',
                tag: 'queue-' + event.params.sessionId
            }
        }
    };

    // Enviar a todos los tokens
    const sendPromises = allTokenStrings.map(({ uid, token }) =>
        admin.messaging().send({ ...message, token: token })
            .then(() => ({ uid, token, ok: true }))
            .catch((err) => ({ uid, token, ok: false, error: err.code || err.message }))
    );
    const results = await Promise.all(sendPromises);

    // Auto-pruning: tokens inválidos los quitamos del array de fcmTokens
    const invalidByUid = {};
    results.forEach((r) => {
        if (r.ok) return;
        if (r.error === 'messaging/registration-token-not-registered' ||
            r.error === 'messaging/invalid-argument' ||
            r.error === 'messaging/invalid-registration-token') {
            invalidByUid[r.uid] = (invalidByUid[r.uid] || []).concat(r.token);
        }
    });
    for (const uid of Object.keys(invalidByUid)) {
        const userRef = db.collection('usuarios').doc(uid);
        try {
            const userSnap = await userRef.get();
            if (!userSnap.exists) continue;
            const fcmTokens = (userSnap.data().fcmTokens || [])
                .filter(t => t && t.token && invalidByUid[uid].indexOf(t.token) === -1);
            await userRef.update({ fcmTokens });
            console.log('[onChatEscalated] pruned ' + invalidByUid[uid].length + ' invalid tokens for ' + uid);
        } catch (e) { /* silencio */ }
    }

    // Marcar timestamp para anti-spam
    await event.data.after.ref.update({
        notifiedFcmAt: new Date().toISOString()
    });

    const okCount = results.filter(r => r.ok).length;
    console.log('[onChatEscalated] ' + okCount + '/' + results.length + ' push notifications sent');
});

exports.proactiveEngagement = onSchedule({
    schedule: 'every 5 minutes',
    region: 'us-central1',
    timeoutSeconds: 60,
    memory: '256MiB'
}, async (event) => {
    const now = Date.now();
    const inactivityCutoff = now - PROACTIVE_INACTIVITY_THRESHOLD_MIN * 60 * 1000;
    const proactiveCooldown = now - PROACTIVE_MIN_INTERVAL_HOURS * 60 * 60 * 1000;

    // Query: chats con mode='bot' y lastMessageAt en últimas 6h
    // (no procesamos chats inactivos viejos, no aporta engagement)
    const recentCutoff = new Date(now - 6 * 60 * 60 * 1000).toISOString();
    let chatsSnap;
    try {
        chatsSnap = await db.collection('conciergeChats')
            .where('mode', '==', 'bot')
            .where('lastMessageAt', '>=', recentCutoff)
            .limit(100)
            .get();
    } catch (err) {
        console.warn('[proactive] query failed:', err.message);
        return;
    }

    let processedCount = 0;
    let triggeredCount = 0;

    for (const doc of chatsSnap.docs) {
        const sessionId = doc.id;
        const chat = doc.data();
        processedCount++;

        // Skip si chat está closed o archived
        if (chat.status === 'closed') continue;
        if (chat.isArchived) continue;
        if (chat.isDeleted) continue;

        // Cooldown: 24h entre proactives por chat
        const lastProactive = chat.lastProactiveAt
            ? new Date(chat.lastProactiveAt).getTime()
            : 0;
        if (lastProactive > proactiveCooldown) continue;

        // Última actividad
        const lastMsgTime = chat.lastMessageAt
            ? new Date(chat.lastMessageAt).getTime()
            : 0;

        // Trigger 1: chat abierto, último mensaje fue del bot/welcome,
        // y el cliente NO ha escrito en 3+ minutos
        // (señal de que duda o se distrajo — empujarlo a continuar)
        const userMsgsSnap = await db.collection('conciergeChats').doc(sessionId)
            .collection('messages')
            .where('from', '==', 'user')
            .limit(1)
            .get();
        const hasUserMsgs = !userMsgsSnap.empty;

        let proactiveText = null;
        let triggerType = null;

        if (!hasUserMsgs && lastMsgTime > 0 && lastMsgTime < inactivityCutoff) {
            // Cliente abrió pero no escribió en 3+ min
            proactiveText = '¿Sigues por aquí? Si tenés alguna pregunta sobre nuestros vehículos, financiación o citas, escribime y te ayudo en seguida 😊';
            triggerType = 'inactivity_no_msg';
        }

        if (proactiveText && triggerType) {
            try {
                // Inyectar mensaje system+bot al chat
                const msgRef = db.collection('conciergeChats').doc(sessionId)
                    .collection('messages').doc();
                await msgRef.set({
                    from: 'bot',
                    text: proactiveText,
                    timestamp: new Date().toISOString(),
                    proactive: true,
                    triggerType: triggerType
                });
                // Actualizar parent: lastProactiveAt + lastMessage para que
                // la lista del admin refleje el cambio
                await db.collection('conciergeChats').doc(sessionId).set({
                    lastProactiveAt: new Date().toISOString(),
                    lastMessage: proactiveText.slice(0, 80),
                    lastMessageAt: new Date().toISOString()
                }, { merge: true });
                triggeredCount++;
            } catch (err) {
                console.warn('[proactive] write failed for sid', sessionId, ':', err.message);
            }
        }
    }

    console.log('[proactive] processed=' + processedCount + ' triggered=' + triggeredCount);
});

/* ═══════════════════════════════════════════════════════════════════════
   §26.5 — TELEGRAM BOT $0 (alternativa GRATUITA a FCM Web Push)
   ═══════════════════════════════════════════════════════════════════════
   Setup operacional one-time:
     1. @BotFather → /newbot → recibir BOT_TOKEN
     2. firebase functions:secrets:set TELEGRAM_BOT_TOKEN
     3. firebase deploy --only functions:linkTelegramChat,functions:onChatEscalatedTelegram
     4. Setear webhook del bot a la URL de linkTelegramChat:
        curl -X POST "https://api.telegram.org/bot{TOKEN}/setWebhook" \
             -d "url=https://us-central1-altorra-cars.cloudfunctions.net/linkTelegramChat"

   Si TELEGRAM_BOT_TOKEN NO está seteado, todo lo de Telegram skip silente.
   FCM sigue funcionando como canal primario.
   ═══════════════════════════════════════════════════════════════════════ */

const { onRequest } = require('firebase-functions/v2/https');

/**
 * linkTelegramChat — webhook del bot Telegram. Recibe el update cuando
 * un asesor hace /start ASESOR_<uid> y persiste el chatId en su perfil.
 */
exports.linkTelegramChat = onRequest({
    cors: false,
    secrets: [telegramBotToken]
}, async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send('POST only');
        return;
    }
    const TOKEN = telegramBotToken.value();
    if (!TOKEN) {
        res.status(503).send('Telegram bot not configured');
        return;
    }
    try {
        const update = req.body || {};
        const message = update.message;
        if (!message || !message.text || !message.from) {
            res.status(200).send('ok');
            return;
        }
        const chatId = message.chat.id;
        const text = String(message.text).trim();

        // Detectar /start ASESOR_<uid>
        const m = text.match(/^\/start\s+ASESOR_([A-Za-z0-9]+)/);
        if (!m) {
            // No es start con payload — responder ayuda
            await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: '👋 Hola! Soy el bot de Altorra Cars.\n\nPara vincular tu cuenta de admin, abrí admin.html → Conectar Telegram.'
                })
            });
            res.status(200).send('ok');
            return;
        }

        const uid = m[1];
        const userRef = db.collection('usuarios').doc(uid);
        const userSnap = await userRef.get();
        if (!userSnap.exists) {
            await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: '❌ Usuario no encontrado. Pedile a un super_admin que verifique tu cuenta.'
                })
            });
            res.status(200).send('ok');
            return;
        }

        // Persistir chatId
        await userRef.update({
            telegramChatId: chatId,
            telegramLinkedAt: admin.firestore.FieldValue.serverTimestamp(),
            telegramUserName: message.from.username || message.from.first_name || 'Asesor'
        });

        const nombre = userSnap.data().nombre || 'Asesor';
        await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: '✅ ¡Listo, ' + nombre + '! Tu cuenta de Altorra Cars está vinculada.\n\nA partir de ahora recibirás alertas push cuando un cliente esté esperando atención.\n\n_Para desvincular: admin.html → Desvincular Telegram_',
                parse_mode: 'Markdown'
            })
        });
        res.status(200).send('ok');
    } catch (err) {
        console.error('[linkTelegramChat] error:', err);
        res.status(500).send('error');
    }
});

/**
 * sendTelegramAlert — envía alerta push al asesor por Telegram.
 * Best-effort: si no hay token o usuario sin chatId, skip silente.
 */
async function sendTelegramAlert(uid, text, options) {
    const TOKEN = telegramBotToken.value();
    if (!TOKEN) return false;
    try {
        const userSnap = await db.collection('usuarios').doc(uid).get();
        if (!userSnap.exists) return false;
        const chatId = userSnap.data().telegramChatId;
        if (!chatId) return false;

        const payload = {
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            // §55 — Garantizar push con sonido (no silent push).
            // Default Telegram ya es false, lo explicitamos para defense.
            disable_notification: false
        };

        // Inline keyboard si se pasa link
        if (options && options.url) {
            payload.reply_markup = {
                inline_keyboard: [[{
                    text: options.urlLabel || 'Atender ahora',
                    url: options.url
                }]]
            };
        }

        const resp = await fetch('https://api.telegram.org/bot' + TOKEN + '/sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // Update lastUsed
        if (resp.ok) {
            await db.collection('usuarios').doc(uid).update({
                telegramLastUsedAt: admin.firestore.FieldValue.serverTimestamp()
            });
        }
        return resp.ok;
    } catch (err) {
        console.warn('[sendTelegramAlert] error for ' + uid + ':', err.message);
        return false;
    }
}

/**
 * onChatEscalatedTelegram — paralelo a onChatEscalated FCM.
 * Cuando un chat entra a queue, además del FCM dispara Telegram a
 * todos los asesores con telegramChatId vinculado.
 */
// §54 (2026-05-08) — 3 fixes coordinados sobre §53:
//
// 1. onDocumentUpdated → onDocumentWritten: captura también CREATE.
//    Si el chat nace directo con mode='queue' (caso real de §47.bis-§52),
//    el trigger onUpdate NO se disparaba. onWrite cubre create+update.
//
// 2. Sin pin de región: deja que Firebase auto-detect la región del
//    trigger Firestore (southamerica-east1, donde vive la base). Evita
//    el cross-region Eventarc → us-central1 que causaba IAM 401.
//
// 3. console.log VERBOSO al inicio (antes de cualquier return guard)
//    para confirmar invocación. Si los logs no aparecen, sabemos que
//    el código nuevo no está corriendo (deploy stale).
exports.onChatEscalatedTelegram = onDocumentWritten({
    document: 'conciergeChats/{sessionId}',
    secrets: [telegramBotToken]
}, async (event) => {
    // §54 — log inmediato sin guards. Si no aparece, deploy stale o
    // función no se invoca. Si aparece, podemos ver before/after y
    // diagnosticar de raíz por qué no se envía el push.
    const sessionId = event.params.sessionId;
    console.log('[onChatEscalatedTelegram] §54 INVOKED — sessionId:', sessionId);

    if (!event.data) {
        console.warn('[onChatEscalatedTelegram] event.data is null. Skip.');
        return;
    }

    const before = event.data.before && event.data.before.exists ? event.data.before.data() : null;
    const after = event.data.after && event.data.after.exists ? event.data.after.data() : null;

    // §54 — log estado de mode para diagnóstico
    const beforeMode = before ? before.mode : '(no-before)';
    const afterMode = after ? after.mode : '(deleted)';
    console.log('[onChatEscalatedTelegram] mode transition:', beforeMode, '→', afterMode);

    // Si el doc se eliminó, skip
    if (!after) {
        console.log('[onChatEscalatedTelegram] Doc deleted. Skip.');
        return;
    }

    // §56 — Trigger condition REFACTORIZADO:
    // En vez de "entered queue" (transición), usar "está en queue Y
    // tiene radicado canónico Y no se notificó aún". Esto resuelve la
    // race condition con onConciergeChatCreated:
    //   - Chat nace con mode='queue' SIN radicado: skip (no notificar
    //     con sessionId-slice). Espera al siguiente trigger fire.
    //   - onConciergeChatCreated asigna radicado: doc update dispara
    //     trigger de nuevo, ahora hasRadicado=true, push se envía con
    //     radicado canónico REQ-YYYYMM-XXXX.
    //   - notifiedTelegramAt flag previene duplicados en futuros updates.
    const nowInQueue = after.mode === 'queue';

    if (!nowInQueue) {
        console.log('[onChatEscalatedTelegram] Not in queue. Skip.');
        return;
    }

    // Anti-duplicate: si ya enviamos alerta para este chat, skip
    if (after.notifiedTelegramAt) {
        console.log('[onChatEscalatedTelegram] Already notified at', after.notifiedTelegramAt, '. Skip.');
        return;
    }

    // §56 — Esperar al radicado canónico. Si no existe aún,
    // onConciergeChatCreated lo asignará en breve y el trigger
    // se re-disparará con el doc actualizado.
    if (!after.radicado) {
        console.log('[onChatEscalatedTelegram] Pending radicado canónico. Skip (will retrigger when assigned).');
        return;
    }
    console.log('[onChatEscalatedTelegram] ✓ Chat in queue with radicado:', after.radicado, '. Processing alert...');

    // §50 — Eliminado filtro por asesoresAvailable.
    // Cliente pidió: "Cada vez que una persona solicite hablar con un asesor
    // si o si debe notificarse por telegram también independientemente si
    // está conectado o no hay asesores online — todo debe ser desde el
    // minuto cero".
    // §56 — El check `notifiedTelegramAt` ya se hizo arriba (anti-duplicate),
    // no necesitamos cooldown adicional aquí. Cada chat solo se notifica
    // una vez en su vida (single-shot).

    // Conseguir lista de asesores con Telegram vinculado
    const usersSnap = await db.collection('usuarios')
        .where('rol', 'in', ['super_admin', 'editor'])
        .get();

    const eligible = [];
    usersSnap.forEach((doc) => {
        const u = doc.data();
        if (u.telegramChatId) eligible.push({ uid: doc.id, chatId: u.telegramChatId, nombre: u.nombre });
    });

    // §53 fix: unificar dead code. Antes había 2 ifs (eligible.length === 0)
    // y el primero hacía return inmediato sin logging ni marcado de timestamp.
    if (eligible.length === 0) {
        console.warn('[onChatEscalatedTelegram] ⚠ NO HAY asesores con telegramChatId vinculado.\n' +
            'Razones posibles:\n' +
            '  1. Webhook del bot NO configurado → bot no responde a /start\n' +
            '     Fix: invocar setupTelegramWebhook() desde admin.\n' +
            '  2. Asesores aún no vincularon su Telegram desde Mi Perfil\n' +
            '     Fix: cada asesor debe hacer click "Conectar Telegram"\n' +
            '  3. TELEGRAM_BOT_TOKEN secret no seteado\n' +
            '     Fix: firebase functions:secrets:set TELEGRAM_BOT_TOKEN');
        // Marcar timestamp igual para no re-disparar inmediatamente
        await event.data.after.ref.update({
            notifiedTelegramAt: new Date().toISOString(),
            telegramSkipReason: 'no_eligible_users'
        });
        return;
    }

    // §53 — logging de diagnóstico para confirmar que el handler entró
    console.log('[onChatEscalatedTelegram] ' + eligible.length + ' asesores elegibles. Enviando alertas...');

    // §56 — Radicado garantizado: ya validamos arriba que after.radicado
    // existe. No más polling, no más fallback al sessionId-slice.
    const radicado = after.radicado;
    const userName = after.userNombre || after.userEmail || 'Cliente';
    const text = '🚨 *Cliente en cola — Altorra Cars*\n\n' +
                 '👤 ' + userName + '\n' +
                 '🎫 Radicado: `' + radicado + '`\n' +
                 (after.sourceVehicleId ? '🚗 Vehículo: ' + after.sourceVehicleId + '\n' : '') +
                 '\n_Tomá la conversación cuanto antes._';

    const url = 'https://altorracars.github.io/admin.html#/concierge';

    const promises = eligible.map((u) =>
        sendTelegramAlert(u.uid, text, { url: url, urlLabel: '📲 Atender ahora' })
    );
    const results = await Promise.all(promises);
    const okCount = results.filter(r => r === true).length;

    // Marcar timestamp anti-spam
    await event.data.after.ref.update({
        notifiedTelegramAt: new Date().toISOString(),
        telegramAlertsCount: admin.firestore.FieldValue.increment(okCount)
    });
    console.log('[onChatEscalatedTelegram] ' + okCount + '/' + eligible.length + ' alertas enviadas');
});

// ═══════════════════════════════════════════════════════════════════
// §88 Sprint C-S10 — onChatTransferred
// ───────────────────────────────────────────────────────────────────
// Trigger onUpdate cuando `claimedBy` cambia y el nuevo claimer es
// distinto del previo (transferencia, NO un primer claim).
//
// Acciones:
// 1. Envía FCM push al nuevo claimer (super_admin/editor) con info
//    del chat transferido (cliente, radicado, asesor previo).
// 2. Envía Telegram alert al nuevo claimer (si tiene chatId vinculado).
// 3. Audit log entry `chat.transferred`.
//
// Anti-loop: filter por `before.claimedBy !== after.claimedBy` y
// además `before.claimedBy != null` (sino es un primer claim, NO
// transferencia — eso lo cubre onChatEscalated).
// ═══════════════════════════════════════════════════════════════════
exports.onChatTransferred = onDocumentUpdated({
    document: 'conciergeChats/{sessionId}',
    secrets: [telegramBotToken]
}, async (event) => {
    const sessionId = event.params.sessionId;
    const before = event.data.before.data();
    const after = event.data.after.data();

    // Anti-loop: solo trigger en TRANSFERENCIA (no primer claim).
    // Primer claim: before.claimedBy=null → after.claimedBy=X (onChatEscalated lo cubre).
    // Transfer: before.claimedBy=X → after.claimedBy=Y (X != Y, ambos != null).
    if (!before.claimedBy || !after.claimedBy) {
        return; // primer claim o release — no es transfer
    }
    if (before.claimedBy === after.claimedBy) {
        return; // sin cambio
    }

    const newClaimerUid = after.claimedBy;
    const newClaimerName = after.claimedByName || 'Asesor';
    const prevClaimerName = before.claimedByName || 'Asesor anterior';
    const radicado = after.radicado || sessionId.slice(-8);
    const clienteName = after.userNombre || after.userEmail || 'Cliente';
    const vehicleHint = after.sourceVehicleId ? '\n🚗 Vehículo: ' + after.sourceVehicleId : '';

    console.log('[onChatTransferred] §88 INVOKED', {
        sessionId,
        from: before.claimedBy,
        to: newClaimerUid,
        radicado
    });

    // ─── FCM Push ─────────────────────────────────────────────
    try {
        const newClaimerSnap = await db.collection('usuarios').doc(newClaimerUid).get();
        if (newClaimerSnap.exists) {
            const fcmTokens = newClaimerSnap.data().fcmTokens || [];
            if (fcmTokens.length > 0) {
                const messaging = admin.messaging();
                const fcmPromises = fcmTokens.map(token =>
                    messaging.send({
                        token: token,
                        notification: {
                            title: '🔁 Chat transferido a ti',
                            body: prevClaimerName + ' te transfirió la conversación de ' + clienteName + ' (' + radicado + ')'
                        },
                        webpush: {
                            fcmOptions: {
                                link: 'https://altorracars.github.io/admin.html#concierge:' + sessionId
                            }
                        }
                    }).catch(err => {
                        console.warn('[onChatTransferred] FCM token failed', token.slice(-8), err.message);
                        return null;
                    })
                );
                await Promise.all(fcmPromises);
                console.log('[onChatTransferred] FCM enviado a', newClaimerUid);
            }
        }
    } catch (err) {
        console.warn('[onChatTransferred] FCM error:', err.message);
    }

    // ─── Telegram Alert ─────────────────────────────────────────
    const tgText = '🔁 *Chat transferido a ti*\n\n' +
        '👤 *Cliente:* ' + clienteName + '\n' +
        '📋 *Radicado:* ' + radicado + '\n' +
        '👨‍💼 *De:* ' + prevClaimerName +
        vehicleHint + '\n\n' +
        '_Tocá el botón para atender de inmediato._';
    const tgUrl = 'https://altorracars.github.io/admin.html#concierge:' + sessionId;
    await sendTelegramAlert(newClaimerUid, tgText, {
        url: tgUrl,
        urlLabel: '📲 Atender ahora'
    });

    // ─── Audit log ──────────────────────────────────────────────
    try {
        await db.collection('auditLog').add({
            type: 'chat.transferred',
            sessionId: sessionId,
            radicado: radicado,
            fromUid: before.claimedBy,
            fromName: prevClaimerName,
            toUid: newClaimerUid,
            toName: newClaimerName,
            clienteName: clienteName,
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
    } catch (err) {
        console.warn('[onChatTransferred] audit log error:', err.message);
    }

    console.log('[onChatTransferred] §88 completo');
});

// ═══════════════════════════════════════════════════════════════════
// §51 — setupTelegramWebhook (callable)
// Configura el webhook del bot de Telegram apuntando a la URL de
// linkTelegramChat. Antes el cliente debía correr un curl manual.
// Ahora es 1 click desde el admin.
// ═══════════════════════════════════════════════════════════════════
exports.setupTelegramWebhook = onCall({
    region: 'us-central1',
    secrets: [telegramBotToken]
}, async (req) => {
    if (!req.auth) {
        throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
    }
    const callerSnap = await db.collection('usuarios').doc(req.auth.uid).get();
    if (!callerSnap.exists || callerSnap.data().rol !== 'super_admin') {
        throw new HttpsError('permission-denied', 'Solo Super Admin puede configurar el webhook de Telegram.');
    }
    const TOKEN = telegramBotToken.value();
    if (!TOKEN) {
        throw new HttpsError('failed-precondition',
            'TELEGRAM_BOT_TOKEN secret no configurado. ' +
            'Correr: firebase functions:secrets:set TELEGRAM_BOT_TOKEN'
        );
    }
    // URL pública de linkTelegramChat
    const webhookUrl = 'https://us-central1-altorra-cars.cloudfunctions.net/linkTelegramChat';
    try {
        const resp = await fetch('https://api.telegram.org/bot' + TOKEN + '/setWebhook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: webhookUrl,
                allowed_updates: ['message']
            })
        });
        const data = await resp.json();
        if (!data.ok) {
            throw new HttpsError('internal', 'Telegram API error: ' + (data.description || 'unknown'));
        }
        console.log('[setupTelegramWebhook] ✓ Webhook configurado a', webhookUrl);
        return {
            success: true,
            webhookUrl: webhookUrl,
            description: data.description
        };
    } catch (err) {
        if (err instanceof HttpsError) throw err;
        throw new HttpsError('internal', 'Error: ' + err.message);
    }
});

// ═══════════════════════════════════════════════════════════════════
// §51 — getTelegramWebhookStatus (callable)
// Devuelve el estado actual del webhook: URL configurada,
// last_error si hay, etc. Útil para diagnóstico desde admin.
// ═══════════════════════════════════════════════════════════════════
exports.getTelegramWebhookStatus = onCall({
    region: 'us-central1',
    secrets: [telegramBotToken]
}, async (req) => {
    if (!req.auth) {
        throw new HttpsError('unauthenticated', 'Debes iniciar sesión.');
    }
    const callerSnap = await db.collection('usuarios').doc(req.auth.uid).get();
    if (!callerSnap.exists || callerSnap.data().rol !== 'super_admin') {
        throw new HttpsError('permission-denied', 'Solo Super Admin.');
    }
    const TOKEN = telegramBotToken.value();
    if (!TOKEN) {
        return { configured: false, reason: 'TELEGRAM_BOT_TOKEN secret no configurado' };
    }
    try {
        const resp = await fetch('https://api.telegram.org/bot' + TOKEN + '/getWebhookInfo');
        const data = await resp.json();
        if (!data.ok) {
            return { configured: false, reason: data.description || 'Error consultando webhook' };
        }
        const info = data.result;
        const expectedUrl = 'https://us-central1-altorra-cars.cloudfunctions.net/linkTelegramChat';
        return {
            configured: !!info.url,
            url: info.url || '',
            isExpected: info.url === expectedUrl,
            expectedUrl: expectedUrl,
            pendingUpdateCount: info.pending_update_count || 0,
            lastErrorDate: info.last_error_date || null,
            lastErrorMessage: info.last_error_message || null,
            maxConnections: info.max_connections || null
        };
    } catch (err) {
        return { configured: false, reason: 'Error: ' + err.message };
    }
});

// ============================================================
// §61.R1 — SEED SYSTEM ROLES + PERMISSIONS (RBAC Foundation)
// ============================================================
// Callable super_admin-only para sembrar el catálogo canónico de
// permissions atómicas + 3 system roles (system_super_admin,
// system_editor, system_viewer) en las colecciones permissions/ y
// roles/.
//
// Idempotente: skip cualquier doc ya existente (matching por id).
//
// IMPORTANTE: este catálogo DEBE quedar sincronizado con
// js/rbac-catalog.js. Cambios futuros requieren update en AMBOS.
// (Sprint R7 agregará helper que detecta drift.)
// ============================================================

const RBAC_CATALOG_VERSION = '1.0.0';

const RBAC_PERMISSIONS = [
    // 🚗 Inventario (14)
    { id: 'vehicles.read',   name: 'Ver vehículos',         description: 'Ver el inventario completo',                         category: 'Inventario', resource: 'vehicles',   action: 'read' },
    { id: 'vehicles.create', name: 'Crear vehículos',       description: 'Agregar nuevos autos al inventario',                 category: 'Inventario', resource: 'vehicles',   action: 'create' },
    { id: 'vehicles.edit',   name: 'Editar vehículos',      description: 'Modificar datos de autos existentes',                category: 'Inventario', resource: 'vehicles',   action: 'edit' },
    { id: 'vehicles.delete', name: 'Eliminar vehículos',    description: 'Borrar vehículos del inventario',                    category: 'Inventario', resource: 'vehicles',   action: 'delete', critical: true },
    { id: 'vehicles.import', name: 'Importar vehículos',    description: 'Carga masiva via CSV/JSON',                          category: 'Inventario', resource: 'vehicles',   action: 'import' },
    { id: 'vehicles.export', name: 'Exportar vehículos',    description: 'Descargar el inventario en CSV',                     category: 'Inventario', resource: 'vehicles',   action: 'export' },
    { id: 'brands.read',     name: 'Ver marcas',            description: 'Ver listado de marcas',                              category: 'Inventario', resource: 'brands',     action: 'read' },
    { id: 'brands.create',   name: 'Crear marcas',          description: 'Agregar nuevas marcas',                              category: 'Inventario', resource: 'brands',     action: 'create' },
    { id: 'brands.edit',     name: 'Editar marcas',         description: 'Modificar marcas existentes',                        category: 'Inventario', resource: 'brands',     action: 'edit' },
    { id: 'brands.delete',   name: 'Eliminar marcas',       description: 'Borrar marcas',                                      category: 'Inventario', resource: 'brands',     action: 'delete', critical: true },
    { id: 'dealers.read',    name: 'Ver aliados',           description: 'Ver lista de concesionarios aliados',                category: 'Inventario', resource: 'dealers',    action: 'read' },
    { id: 'dealers.create',  name: 'Crear aliados',         description: 'Registrar nuevos aliados',                           category: 'Inventario', resource: 'dealers',    action: 'create' },
    { id: 'dealers.edit',    name: 'Editar aliados',        description: 'Modificar datos de aliados',                         category: 'Inventario', resource: 'dealers',    action: 'edit' },
    { id: 'dealers.delete',  name: 'Eliminar aliados',      description: 'Borrar aliados',                                     category: 'Inventario', resource: 'dealers',    action: 'delete', critical: true },

    // 🌐 Sitio público (8)
    { id: 'banners.read',    name: 'Ver banners',           description: 'Ver banners promocionales',                          category: 'Sitio público', resource: 'banners', action: 'read' },
    { id: 'banners.create',  name: 'Crear banners',         description: 'Agregar nuevos banners',                             category: 'Sitio público', resource: 'banners', action: 'create' },
    { id: 'banners.edit',    name: 'Editar banners',        description: 'Modificar banners existentes',                       category: 'Sitio público', resource: 'banners', action: 'edit' },
    { id: 'banners.delete',  name: 'Eliminar banners',      description: 'Borrar banners',                                     category: 'Sitio público', resource: 'banners', action: 'delete', critical: true },
    { id: 'reviews.read',    name: 'Ver reseñas',           description: 'Ver reseñas de clientes',                            category: 'Sitio público', resource: 'reviews', action: 'read' },
    { id: 'reviews.create',  name: 'Crear reseñas',         description: 'Agregar reseñas manuales',                           category: 'Sitio público', resource: 'reviews', action: 'create' },
    { id: 'reviews.edit',    name: 'Editar reseñas',        description: 'Modificar reseñas',                                  category: 'Sitio público', resource: 'reviews', action: 'edit' },
    { id: 'reviews.delete',  name: 'Eliminar reseñas',      description: 'Borrar reseñas',                                     category: 'Sitio público', resource: 'reviews', action: 'delete', critical: true },

    // 👥 CRM (6)
    { id: 'crm.read',    name: 'Ver CRM',               description: 'Ver lista de contactos del CRM',                     category: 'CRM', resource: 'crm', action: 'read' },
    { id: 'crm.create',  name: 'Crear contactos',       description: 'Agregar contactos manualmente',                      category: 'CRM', resource: 'crm', action: 'create' },
    { id: 'crm.edit',    name: 'Editar contactos',      description: 'Modificar datos de contactos',                       category: 'CRM', resource: 'crm', action: 'edit' },
    { id: 'crm.delete',  name: 'Eliminar contactos',    description: 'Borrar contactos del CRM',                           category: 'CRM', resource: 'crm', action: 'delete', critical: true },
    { id: 'crm.assign',  name: 'Asignar contactos',     description: 'Asignar leads a asesores',                           category: 'CRM', resource: 'crm', action: 'assign' },
    { id: 'crm.export',  name: 'Exportar CRM',          description: 'Descargar contactos en CSV',                         category: 'CRM', resource: 'crm', action: 'export' },

    // 💬 Comunicaciones (12)
    { id: 'appointments.read',   name: 'Ver citas',                  description: 'Ver citas agendadas',                            category: 'Comunicaciones', resource: 'appointments', action: 'read' },
    { id: 'appointments.create', name: 'Crear citas',                description: 'Agendar citas manualmente',                      category: 'Comunicaciones', resource: 'appointments', action: 'create' },
    { id: 'appointments.edit',   name: 'Editar citas',               description: 'Modificar/reagendar citas',                      category: 'Comunicaciones', resource: 'appointments', action: 'edit' },
    { id: 'appointments.delete', name: 'Eliminar citas',             description: 'Borrar citas',                                   category: 'Comunicaciones', resource: 'appointments', action: 'delete', critical: true },
    { id: 'concierge.read',      name: 'Ver ALTOR Hub',              description: 'Ver conversaciones del Hub',                     category: 'Comunicaciones', resource: 'concierge',    action: 'read' },
    { id: 'concierge.respond',   name: 'Responder en Hub',           description: 'Enviar mensajes como asesor',                    category: 'Comunicaciones', resource: 'concierge',    action: 'respond' },
    { id: 'concierge.claim',     name: 'Tomar conversaciones',       description: 'Hacerse cargo de un chat',                       category: 'Comunicaciones', resource: 'concierge',    action: 'claim' },
    { id: 'concierge.transfer',  name: 'Transferir chats',           description: 'Pasar conversación a otro asesor',               category: 'Comunicaciones', resource: 'concierge',    action: 'transfer' },
    { id: 'concierge.close',     name: 'Cerrar conversaciones',      description: 'Marcar chats como resueltos',                    category: 'Comunicaciones', resource: 'concierge',    action: 'close' },
    { id: 'concierge.reopen',    name: 'Reabrir conversaciones',     description: 'Reabrir chats cerrados',                         category: 'Comunicaciones', resource: 'concierge',    action: 'reopen' },
    { id: 'concierge.delete',    name: 'Eliminar conversaciones',    description: 'Borrar chats permanentemente',                   category: 'Comunicaciones', resource: 'concierge',    action: 'delete', critical: true },
    { id: 'concierge.summarize', name: 'Resumir con IA',             description: 'Generar resúmenes IA',                           category: 'Comunicaciones', resource: 'concierge',    action: 'summarize' },

    // 🧠 Cerebro AI (8)
    { id: 'kb.read',         name: 'Ver Cerebro AI',            description: 'Ver knowledge base del bot',                category: 'Cerebro AI', resource: 'kb',        action: 'read' },
    { id: 'kb.create',       name: 'Crear FAQs',                description: 'Agregar nuevas FAQs al bot',                category: 'Cerebro AI', resource: 'kb',        action: 'create' },
    { id: 'kb.edit',         name: 'Editar Cerebro AI',         description: 'Modificar identidad/instrucciones del bot', category: 'Cerebro AI', resource: 'kb',        action: 'edit' },
    { id: 'kb.delete',       name: 'Eliminar FAQs',             description: 'Borrar FAQs',                               category: 'Cerebro AI', resource: 'kb',        action: 'delete', critical: true },
    { id: 'kb.bootstrap',    name: 'Sembrar FAQs base',         description: 'Inicializar 25 FAQs predefinidas',          category: 'Cerebro AI', resource: 'kb',        action: 'bootstrap' },
    { id: 'unmatched.read',    name: 'Ver "Lo que no entendí"', description: 'Ver consultas sin match del bot',           category: 'Cerebro AI', resource: 'unmatched', action: 'read' },
    { id: 'unmatched.promote', name: 'Promover a FAQ',          description: 'Convertir consultas en FAQs',               category: 'Cerebro AI', resource: 'unmatched', action: 'promote' },
    { id: 'unmatched.delete',  name: 'Eliminar consultas no match', description: 'Borrar registros de "Lo que no entendí"', category: 'Cerebro AI', resource: 'unmatched', action: 'delete' },

    // 📅 Calendario (6)
    { id: 'calendar.read',     name: 'Ver calendario',           description: 'Ver vista mes/día del calendario',           category: 'Calendario', resource: 'calendar', action: 'read' },
    { id: 'calendar.create',   name: 'Crear eventos',            description: 'Agregar eventos manualmente',                category: 'Calendario', resource: 'calendar', action: 'create' },
    { id: 'calendar.edit',     name: 'Editar eventos',           description: 'Modificar eventos del calendario',           category: 'Calendario', resource: 'calendar', action: 'edit' },
    { id: 'calendar.delete',   name: 'Eliminar eventos',         description: 'Borrar eventos',                             category: 'Calendario', resource: 'calendar', action: 'delete', critical: true },
    { id: 'calendar.config',   name: 'Configurar disponibilidad', description: 'Editar workDays/workHours/slots',           category: 'Calendario', resource: 'calendar', action: 'config' },
    { id: 'calendar.holidays', name: 'Gestionar festivos',       description: 'CRUD de festivos del calendario',            category: 'Calendario', resource: 'calendar', action: 'holidays' },

    // 📊 Reportes (2)
    { id: 'reports.view',   name: 'Ver reportes',            description: 'Acceder al dashboard de reportes',           category: 'Reportes', resource: 'reports', action: 'view' },
    { id: 'reports.export', name: 'Exportar reportes',       description: 'Descargar reportes en CSV/PDF',              category: 'Reportes', resource: 'reports', action: 'export' },

    // ⚙️ Configuración (23)
    { id: 'users.read',     name: 'Ver usuarios',                description: 'Ver lista de usuarios admin',               category: 'Configuración', resource: 'users',     action: 'read' },
    { id: 'users.create',   name: 'Crear usuarios',              description: 'Crear nuevos usuarios admin',               category: 'Configuración', resource: 'users',     action: 'create',  critical: true },
    { id: 'users.edit',     name: 'Editar usuarios',             description: 'Modificar datos de usuarios admin',         category: 'Configuración', resource: 'users',     action: 'edit',    critical: true },
    { id: 'users.delete',   name: 'Eliminar usuarios',           description: 'Borrar usuarios admin',                     category: 'Configuración', resource: 'users',     action: 'delete',  critical: true },
    { id: 'users.unlock',   name: 'Desbloquear usuarios',        description: 'Limpiar bloqueo por intentos fallidos',     category: 'Configuración', resource: 'users',     action: 'unlock' },
    { id: 'roles.read',     name: 'Ver roles',                   description: 'Ver roles del sistema',                     category: 'Configuración', resource: 'roles',     action: 'read' },
    { id: 'roles.create',   name: 'Crear roles',                 description: 'Crear roles personalizados',                category: 'Configuración', resource: 'roles',     action: 'create',  critical: true },
    { id: 'roles.edit',     name: 'Editar roles',                description: 'Modificar permisos de roles',               category: 'Configuración', resource: 'roles',     action: 'edit',    critical: true },
    { id: 'roles.delete',   name: 'Eliminar roles',              description: 'Borrar roles personalizados',               category: 'Configuración', resource: 'roles',     action: 'delete',  critical: true },
    { id: 'audit.read',     name: 'Ver auditoría',               description: 'Ver log de actividad',                      category: 'Configuración', resource: 'audit',     action: 'read' },
    { id: 'audit.export',   name: 'Exportar auditoría',          description: 'Descargar audit log',                       category: 'Configuración', resource: 'audit',     action: 'export' },
    { id: 'audit.delete',   name: 'Eliminar entradas de auditoría', description: 'Borrar registros del log',                category: 'Configuración', resource: 'audit',     action: 'delete',  critical: true },
    { id: 'workflows.read',   name: 'Ver workflows',             description: 'Ver reglas de automatización',              category: 'Configuración', resource: 'workflows', action: 'read' },
    { id: 'workflows.create', name: 'Crear workflows',           description: 'Crear nuevas reglas',                       category: 'Configuración', resource: 'workflows', action: 'create' },
    { id: 'workflows.edit',   name: 'Editar workflows',          description: 'Modificar reglas existentes',               category: 'Configuración', resource: 'workflows', action: 'edit' },
    { id: 'workflows.delete', name: 'Eliminar workflows',        description: 'Borrar reglas',                             category: 'Configuración', resource: 'workflows', action: 'delete' },
    { id: 'templates.read',   name: 'Ver plantillas',            description: 'Ver plantillas de respuesta',               category: 'Configuración', resource: 'templates', action: 'read' },
    { id: 'templates.create', name: 'Crear plantillas',          description: 'Crear nuevas plantillas',                   category: 'Configuración', resource: 'templates', action: 'create' },
    { id: 'templates.edit',   name: 'Editar plantillas',         description: 'Modificar plantillas',                      category: 'Configuración', resource: 'templates', action: 'edit' },
    { id: 'templates.delete', name: 'Eliminar plantillas',       description: 'Borrar plantillas',                         category: 'Configuración', resource: 'templates', action: 'delete' },
    { id: 'settings.theme',   name: 'Cambiar tema',              description: 'Cambiar tema visual del admin',             category: 'Configuración', resource: 'settings',  action: 'theme' },
    { id: 'settings.seo',     name: 'Configurar SEO',            description: 'Regenerar páginas SEO + GitHub token',      category: 'Configuración', resource: 'settings',  action: 'seo',    critical: true },
    { id: 'settings.backup',  name: 'Backup/Restore',            description: 'Exportar/importar respaldo de datos',       category: 'Configuración', resource: 'settings',  action: 'backup', critical: true }
];

// §69 R7 — Reducido a UN solo system role: CEO. Editor + Viewer
// eliminados del seeder. Si docs roles/system_editor o roles/system_viewer
// ya existen en Firestore (sembrados por seedSystemRoles antes de §69),
// se mantienen intactos. seedSystemRoles ya NO los re-siembra.
const RBAC_SYSTEM_ROLES = [
    {
        id: 'system_super_admin',
        name: 'CEO',
        description: 'Acceso absoluto al sistema. No se puede modificar, editar ni eliminar.',
        isSystem: true,
        isDefault: false,
        color: '#b89658',
        icon: 'crown',
        permissions: ['*']
    }
    // §69 R7 — Editor y Viewer ELIMINADOS del seeder.
];

exports.seedSystemRoles = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const result = {
        success: true,
        version: RBAC_CATALOG_VERSION,
        permissions: { created: 0, skipped: 0, total: RBAC_PERMISSIONS.length },
        roles: { created: 0, skipped: 0, total: RBAC_SYSTEM_ROLES.length },
        timestamp: new Date().toISOString()
    };

    try {
        // 1) Sembrar permissions/ (idempotente — skip si existe)
        const permsSnapshot = await db.collection('permissions').get();
        const existingPerms = new Set();
        permsSnapshot.forEach(doc => existingPerms.add(doc.id));

        const batch1 = db.batch();
        let batch1Count = 0;
        for (const perm of RBAC_PERMISSIONS) {
            if (existingPerms.has(perm.id)) {
                result.permissions.skipped++;
                continue;
            }
            const docRef = db.collection('permissions').doc(perm.id);
            batch1.set(docRef, {
                ...perm,
                createdAt: new Date().toISOString(),
                createdBy: request.auth.uid,
                _catalogVersion: RBAC_CATALOG_VERSION
            });
            batch1Count++;
            result.permissions.created++;

            // Firestore batch tiene cap de 500 ops
            if (batch1Count === 500) {
                await batch1.commit();
                batch1Count = 0;
            }
        }
        if (batch1Count > 0) {
            await batch1.commit();
        }

        // 2) Sembrar/actualizar roles/ (idempotente con UPDATE de canonical fields)
        // §70 R7.1 — Si el doc existe, hacer UPDATE merge de los campos
        // canonical (name, description, color, icon, permissions). Esto cubre
        // el caso del cliente que ya tiene roles/system_super_admin sembrado
        // con label antiguo "Super Administrador" y necesita el nuevo "CEO".
        // Solo se actualiza si difiere algún campo canonical.
        const rolesSnapshot = await db.collection('roles').get();
        const existingRolesData = {};
        rolesSnapshot.forEach(doc => { existingRolesData[doc.id] = doc.data(); });

        result.roles.updated = 0;
        const batch2 = db.batch();
        let batch2Count = 0;
        for (const role of RBAC_SYSTEM_ROLES) {
            const docRef = db.collection('roles').doc(role.id);
            const existing = existingRolesData[role.id];
            if (existing) {
                // §70 — verificar drift y UPDATE canonical fields si difieren
                const needsUpdate =
                    existing.name !== role.name ||
                    existing.description !== role.description ||
                    existing.color !== role.color ||
                    existing.icon !== role.icon ||
                    JSON.stringify(existing.permissions || []) !== JSON.stringify(role.permissions);
                if (needsUpdate) {
                    batch2.set(docRef, {
                        name: role.name,
                        description: role.description,
                        color: role.color,
                        icon: role.icon,
                        permissions: role.permissions,
                        isSystem: true,
                        updatedAt: new Date().toISOString(),
                        updatedBy: request.auth.uid,
                        updatedByName: 'System (resync §70)',
                        _catalogVersion: RBAC_CATALOG_VERSION,
                        _resyncedAt: new Date().toISOString()
                    }, { merge: true });
                    batch2Count++;
                    result.roles.updated++;
                } else {
                    result.roles.skipped++;
                }
            } else {
                batch2.set(docRef, {
                    ...role,
                    userCount: 0,
                    createdAt: new Date().toISOString(),
                    createdBy: request.auth.uid,
                    createdByName: 'System',
                    updatedAt: new Date().toISOString(),
                    updatedBy: request.auth.uid,
                    updatedByName: 'System',
                    _version: 1,
                    _catalogVersion: RBAC_CATALOG_VERSION
                });
                batch2Count++;
                result.roles.created++;
            }
        }
        if (batch2Count > 0) {
            await batch2.commit();
        }

        // 3) §70 R7.1 — Re-sync denormalización de usuarios con roleId
        //    apuntando a un system role actualizado. Esto cubre el caso
        //    del CEO en sec-users que mostraba "Super Administrador" en
        //    lugar de "CEO" porque usuarios/{uid}.roleName quedó stale.
        result.users = { resynced: 0 };
        for (const role of RBAC_SYSTEM_ROLES) {
            try {
                const usersSnap = await db.collection('usuarios')
                    .where('roleId', '==', role.id)
                    .get();
                if (usersSnap.empty) continue;
                const userBatch = db.batch();
                let resyncCount = 0;
                usersSnap.forEach(uDoc => {
                    const u = uDoc.data();
                    const nameDrift = u.roleName !== role.name;
                    const permsDrift = JSON.stringify(u.permissions || []) !== JSON.stringify(role.permissions);
                    const cargoDrift = u.cargo !== role.name; // §114 — cargo = roleName espejo
                    if (nameDrift || permsDrift || cargoDrift) {
                        userBatch.update(uDoc.ref, {
                            roleName: role.name,
                            cargo: role.name, // §114 — sincroniza CARGO (read-only mirror)
                            permissions: role.permissions,
                            permissionsUpdatedAt: new Date().toISOString(),
                            _resyncedAt: new Date().toISOString()
                        });
                        resyncCount++;
                    }
                });
                if (resyncCount > 0) {
                    await userBatch.commit();
                    result.users.resynced += resyncCount;
                }
            } catch (resyncErr) {
                console.warn('[seedSystemRoles] §70 resync de usuarios para role', role.id, 'falló:', resyncErr.message);
            }
        }

        return result;
    } catch (err) {
        throw new HttpsError('internal',
            'Error al sembrar roles del sistema: ' + (err.message || String(err)),
            { code: err.code || 'unknown', originalMessage: err.message || String(err) });
    }
});

// ============================================================
// §61.R4 — MIGRATE LEGACY USERS (RBAC Migration)
// ============================================================
// Callable super_admin-only que migra todos los usuarios pre-RBAC
// (con campo `rol` legacy pero sin `roleId/permissions[]`) al
// sistema dinámico de R1+R2.
//
// Por cada doc usuarios/{uid} con `rol` pero sin `roleId`:
//   - super_admin → roleId: system_super_admin, permissions: ['*']
//   - editor → roleId: system_editor, permissions: [38 items]
//   - viewer → roleId: system_viewer, permissions: [17 items]
//
// Setea: roleId, roleName, permissions[], permissionsUpdatedAt,
//        roleMigratedAt (marker de migración).
// Preserva: rol legacy (retrocompat).
//
// Idempotente: skip si ya tiene roleId + permissions (re-ejecutar
// es seguro, solo migra los pendientes).
//
// Soporta dryRun:true para preview sin escribir nada (UI lo usa
// para mostrar plan al super_admin antes de confirmar).
// ============================================================

exports.migrateLegacyUsers = onCall(callableOptionsV2, async (request) => {
    await verifySuperAdmin(request.auth);

    const dryRun = !!(request.data && request.data.dryRun);

    // §69 R7 — Solo super_admin se mapea automáticamente a CEO.
    // Editor y viewer legacy quedan SIN mapeo: el super_admin debe
    // crear custom roles desde sec-roles y asignarlos manualmente.
    // 1) Validar que CEO (system_super_admin) exista en Firestore.
    const sysRolesData = {};
    const ceoSnap = await db.collection('roles').doc('system_super_admin').get();
    if (!ceoSnap.exists) {
        throw new HttpsError('failed-precondition',
            'Rol CEO (system_super_admin) no sembrado en Firestore. Ejecutá primero "Sembrar roles del sistema" desde sec-roles.');
    }
    sysRolesData['system_super_admin'] = ceoSnap.data();

    // §69 R7 — Editor y viewer legacy NO se auto-mapean a system_X.
    // Si docs roles/system_editor o roles/system_viewer existen
    // (de seedSystemRoles previos), los leemos para mantener migración
    // de users que ya tenían roleId='system_editor'/'system_viewer'.
    const legacyEditorSnap = await db.collection('roles').doc('system_editor').get();
    if (legacyEditorSnap.exists) sysRolesData['system_editor'] = legacyEditorSnap.data();
    const legacyViewerSnap = await db.collection('roles').doc('system_viewer').get();
    if (legacyViewerSnap.exists) sysRolesData['system_viewer'] = legacyViewerSnap.data();

    const LEGACY_MAP = {
        'super_admin': 'system_super_admin'
        // §69 R7 — 'editor' y 'viewer' eliminados del auto-mapeo.
        // Users con esos rol legacy quedan "sin rol asignado" hasta
        // que el CEO los reasigne manualmente.
    };

    // 2) Recorrer todos los usuarios y armar plan
    const usersSnap = await db.collection('usuarios').get();
    const result = {
        success: true,
        dryRun: dryRun,
        version: '1.0.0',
        total: usersSnap.size,
        migrated: 0,
        alreadyMigrated: 0,
        skipped: 0,
        skippedDetails: [],
        plan: [],
        timestamp: new Date().toISOString()
    };

    const nowIso = new Date().toISOString();
    let batch = db.batch();
    let batchOps = 0;
    const batches = [];

    usersSnap.forEach((doc) => {
        const data = doc.data() || {};

        // Ya migrado: tiene roleId Y permissions[]
        if (data.roleId && Array.isArray(data.permissions)) {
            result.alreadyMigrated++;
            return;
        }

        // Sin rol legacy: skip silencioso (perfil incompleto)
        if (!data.rol) {
            result.skipped++;
            result.skippedDetails.push({
                uid: doc.id,
                email: data.email || null,
                reason: 'sin_rol_legacy'
            });
            return;
        }

        // Rol legacy desconocido (no es super_admin/editor/viewer)
        const targetRoleId = LEGACY_MAP[data.rol];
        if (!targetRoleId) {
            result.skipped++;
            result.skippedDetails.push({
                uid: doc.id,
                email: data.email || null,
                reason: 'rol_desconocido',
                rol: data.rol
            });
            return;
        }

        // Datos a aplicar
        const targetRole = sysRolesData[targetRoleId];
        const updates = {
            roleId: targetRoleId,
            roleName: targetRole.name,
            // §114 — cargo = roleName (espejo read-only del rol del sistema)
            cargo: targetRole.name,
            permissions: Array.isArray(targetRole.permissions) ? targetRole.permissions.slice() : [],
            permissionsUpdatedAt: nowIso,
            roleMigratedAt: nowIso,
            roleMigratedBy: request.auth.uid
        };

        result.migrated++;
        result.plan.push({
            uid: doc.id,
            email: data.email || null,
            nombre: data.nombre || null,
            currentRol: data.rol,
            targetRoleId: targetRoleId,
            targetRoleName: targetRole.name,
            permsCount: updates.permissions.length
        });

        // Si dryRun, no escribimos nada
        if (!dryRun) {
            batch.update(doc.ref, updates);
            batchOps++;
            if (batchOps === 500) {
                batches.push(batch);
                batch = db.batch();
                batchOps = 0;
            }
        }
    });

    // 3) Commit batches (solo si no es dryRun)
    if (!dryRun && batchOps > 0) batches.push(batch);
    if (!dryRun && batches.length > 0) {
        for (const b of batches) {
            await b.commit();
        }
    }

    return result;
});

// ============================================================
// §61.R7b — RBAC AUTO-PROPAGATION TRIGGERS (§71)
// ============================================================
// 4 Cloud Functions que automatizan la propagación de cambios
// en roles a los usuarios denormalizados, eliminando la dependencia
// de "Resembrar sistema" manual del §70.
//
// 1. onRoleUpdated  → role doc cambia → re-sync usuarios con ese roleId
// 2. onRoleDeleted  → role doc eliminado → orphana usuarios afectados
// 3. onUserRoleAssigned → user.roleId cambia → sync name/permissions
// 4. recalculateRoleUserCount (schedule 5min) → actualiza userCount
//
// Anti-loops:
// - onRoleUpdated escribe SOLO roleName/permissions (no roleId) →
//   no triggea onUserRoleAssigned (que filtra por roleId change).
// - onUserRoleAssigned escribe roleName/permissions → no cambia
//   roleId → no se vuelve a triggear.
// - onRoleDeleted setea roleId=null → triggea onUserRoleAssigned
//   pero el guard `!after.roleId` solo limpia permissions sin recursión.
// ============================================================

/**
 * §71 — onRoleUpdated
 * Trigger: roles/{roleId} actualizado.
 * Acción: si name/permissions/color cambió, re-sync TODOS los usuarios
 * con ese roleId (batch writes con cap 500).
 * Audit log en auditLog/ con type='role.updated'.
 */
exports.onRoleUpdated = onDocumentUpdated('roles/{roleId}', async (event) => {
    const roleId = event.params.roleId;
    if (!event.data) return;
    const before = event.data.before.exists ? event.data.before.data() : null;
    const after = event.data.after.exists ? event.data.after.data() : null;
    if (!before || !after) return;

    // Detectar drift relevante
    const nameDrift = (before.name || '') !== (after.name || '');
    const permsDrift = JSON.stringify(before.permissions || []) !== JSON.stringify(after.permissions || []);
    const colorDrift = (before.color || '') !== (after.color || '');

    if (!nameDrift && !permsDrift && !colorDrift) {
        // Skip silencioso si solo cambiaron campos no-canonical
        // (e.g. updatedAt, _resyncedAt, userCount)
        return;
    }

    console.log(`[onRoleUpdated] §71 drift detectado en roleId=${roleId} — name:${nameDrift} perms:${permsDrift} color:${colorDrift}`);

    // Buscar usuarios con este roleId
    let usersSnap;
    try {
        usersSnap = await db.collection('usuarios').where('roleId', '==', roleId).get();
    } catch (err) {
        console.error('[onRoleUpdated] §71 error al buscar usuarios:', err.message);
        return;
    }

    if (usersSnap.empty) {
        console.log(`[onRoleUpdated] §71 sin usuarios con roleId=${roleId}`);
        return;
    }

    // Construir update minimal (solo campos que cambiaron)
    const userUpdates = {
        _resyncedAt: new Date().toISOString(),
        _resyncedBy: 'onRoleUpdated'
    };
    if (nameDrift) {
        userUpdates.roleName = after.name;
        // §114 — cargo es espejo read-only del rol del sistema (roleName).
        // Al renombrar el rol, se propaga al CARGO de todos sus usuarios.
        userUpdates.cargo = after.name;
    }
    if (permsDrift) {
        userUpdates.permissions = after.permissions || [];
        userUpdates.permissionsUpdatedAt = new Date().toISOString();
    }

    // Batch writes con cap 500
    let updated = 0;
    let batch = db.batch();
    let batchCount = 0;

    for (const uDoc of usersSnap.docs) {
        batch.update(uDoc.ref, userUpdates);
        batchCount++;
        updated++;
        if (batchCount === 500) {
            await batch.commit();
            batch = db.batch();
            batchCount = 0;
        }
    }
    if (batchCount > 0) await batch.commit();

    console.log(`[onRoleUpdated] §71 resincronizados ${updated} usuarios con roleId=${roleId}`);

    // Audit log (solo si hubo drift relevante)
    try {
        await db.collection('auditLog').add({
            type: 'role.updated',
            roleId: roleId,
            roleName: after.name,
            beforeName: before.name,
            permissionsBeforeCount: (before.permissions || []).length,
            permissionsAfterCount: (after.permissions || []).length,
            usersResynced: updated,
            triggeredBy: 'onRoleUpdated',
            timestamp: new Date().toISOString(),
            actor: 'system',
            actorName: 'Cloud Function (§71 R7b)'
        });
    } catch (err) {
        console.warn('[onRoleUpdated] §71 audit log falló:', err.message);
    }
});

/**
 * §71 — onRoleDeleted
 * Trigger: roles/{roleId} eliminado.
 * Acción: para todos los usuarios con ese roleId, setea roleId=null
 * + roleName=null + permissions=[]. Esos usuarios quedan bloqueados
 * con la pantalla "Sin rol asignado" (§69 guard) hasta que el CEO
 * les reasigne.
 */
exports.onRoleDeleted = onDocumentDeleted('roles/{roleId}', async (event) => {
    const roleId = event.params.roleId;
    if (!event.data) return;
    const data = event.data.data() || {};

    // Alerta si se eliminó un system role (no debería pasar — rules
    // backend lo bloquean, pero defense-in-depth)
    if (data.isSystem) {
        console.error(`[onRoleDeleted] §71 ALERTA CRÍTICA: system role eliminado! roleId=${roleId} name=${data.name}`);
        try {
            await db.collection('auditLog').add({
                type: 'role.deleted-CRITICAL',
                roleId: roleId,
                wasName: data.name,
                wasIsSystem: true,
                severity: 'critical',
                message: 'System role eliminado — verificar rules + restaurar manualmente',
                timestamp: new Date().toISOString(),
                actor: 'system',
                actorName: 'Cloud Function (§71 R7b)'
            });
        } catch (e) {}
    }

    // Orphanar usuarios con ese roleId
    let usersSnap;
    try {
        usersSnap = await db.collection('usuarios').where('roleId', '==', roleId).get();
    } catch (err) {
        console.error('[onRoleDeleted] §71 error al buscar usuarios:', err.message);
        return;
    }

    if (usersSnap.empty) {
        console.log(`[onRoleDeleted] §71 sin usuarios huérfanos con roleId=${roleId}`);
        return;
    }

    const userUpdates = {
        roleId: admin.firestore.FieldValue.delete(),
        roleName: admin.firestore.FieldValue.delete(),
        permissions: [],
        permissionsUpdatedAt: new Date().toISOString(),
        _resyncedAt: new Date().toISOString(),
        _resyncedBy: 'onRoleDeleted',
        _orphanedFromRole: roleId,
        _orphanedRoleName: data.name || null,
        _orphanedAt: new Date().toISOString()
    };

    let updated = 0;
    let batch = db.batch();
    let batchCount = 0;

    for (const uDoc of usersSnap.docs) {
        batch.update(uDoc.ref, userUpdates);
        batchCount++;
        updated++;
        if (batchCount === 500) {
            await batch.commit();
            batch = db.batch();
            batchCount = 0;
        }
    }
    if (batchCount > 0) await batch.commit();

    console.log(`[onRoleDeleted] §71 ${updated} usuarios huérfanos del roleId=${roleId} (${data.name})`);

    try {
        await db.collection('auditLog').add({
            type: 'role.deleted',
            roleId: roleId,
            wasName: data.name || null,
            wasIsSystem: !!data.isSystem,
            wasPermissionsCount: (data.permissions || []).length,
            usersOrphaned: updated,
            triggeredBy: 'onRoleDeleted',
            timestamp: new Date().toISOString(),
            actor: 'system',
            actorName: 'Cloud Function (§71 R7b)'
        });
    } catch (err) {
        console.warn('[onRoleDeleted] §71 audit log falló:', err.message);
    }
});

/**
 * §71 — onUserRoleAssigned
 * Trigger: usuarios/{uid} actualizado.
 * Acción: si roleId cambió, leer el nuevo role doc y copiar
 * roleName + permissions denormalizado. Cubre el caso de admin
 * que cambia roleId desde Firestore Console o desde sec-users.
 *
 * Anti-loop: filter por roleId change. onRoleUpdated NO modifica
 * roleId → no triggea esto recursivamente.
 */
exports.onUserRoleAssigned = onDocumentUpdated('usuarios/{uid}', async (event) => {
    const uid = event.params.uid;
    if (!event.data) return;
    const before = event.data.before.exists ? event.data.before.data() : null;
    const after = event.data.after.exists ? event.data.after.data() : null;
    if (!before || !after) return;

    // Solo procesar si roleId cambió
    if (before.roleId === after.roleId) return;

    console.log(`[onUserRoleAssigned] §71 uid=${uid} roleId cambió: ${before.roleId} → ${after.roleId}`);

    // Caso: roleId removido (set to null/undefined)
    if (!after.roleId) {
        // Asegurar permissions vacío y roleName limpio
        const needsCleanup = (after.permissions && after.permissions.length > 0) ||
                             after.roleName;
        if (needsCleanup || after.cargo) {
            try {
                await event.data.after.ref.update({
                    roleName: admin.firestore.FieldValue.delete(),
                    // §114 — sin rol → CARGO se limpia (queda "Sin rol asignado")
                    cargo: admin.firestore.FieldValue.delete(),
                    permissions: [],
                    permissionsUpdatedAt: new Date().toISOString(),
                    _resyncedAt: new Date().toISOString(),
                    _resyncedBy: 'onUserRoleAssigned (roleId removed)'
                });
                console.log(`[onUserRoleAssigned] §71 uid=${uid} cleanup: roleId removido`);
            } catch (err) {
                console.warn('[onUserRoleAssigned] §71 cleanup falló:', err.message);
            }
        }
        return;
    }

    // Leer el nuevo role doc
    let roleSnap;
    try {
        roleSnap = await db.collection('roles').doc(after.roleId).get();
    } catch (err) {
        console.error('[onUserRoleAssigned] §71 error al leer role:', err.message);
        return;
    }

    if (!roleSnap.exists) {
        console.warn(`[onUserRoleAssigned] §71 roleId=${after.roleId} no existe en Firestore`);
        return;
    }

    const role = roleSnap.data();

    // Verificar si necesita sync (drift entre user.roleName/permissions/cargo y role.*)
    const nameDrift = after.roleName !== role.name;
    const permsDrift = JSON.stringify(after.permissions || []) !== JSON.stringify(role.permissions || []);
    // §114 — cargo es espejo read-only del rol: debe igualar role.name
    const cargoDrift = after.cargo !== role.name;

    if (!nameDrift && !permsDrift && !cargoDrift) return;

    try {
        await event.data.after.ref.update({
            roleName: role.name,
            // §114 — CARGO = roleName (auto-asignado, read-only en el perfil)
            cargo: role.name,
            permissions: role.permissions || [],
            permissionsUpdatedAt: new Date().toISOString(),
            _resyncedAt: new Date().toISOString(),
            _resyncedBy: 'onUserRoleAssigned'
        });
        console.log(`[onUserRoleAssigned] §71 uid=${uid} sync con role ${after.roleId} OK`);
    } catch (err) {
        console.error('[onUserRoleAssigned] §71 update user falló:', err.message);
        return;
    }

    // Audit log
    try {
        await db.collection('auditLog').add({
            type: 'user.role-assigned',
            uid: uid,
            previousRoleId: before.roleId || null,
            newRoleId: after.roleId,
            newRoleName: role.name,
            permissionsCount: (role.permissions || []).length,
            triggeredBy: 'onUserRoleAssigned',
            timestamp: new Date().toISOString(),
            actor: 'system',
            actorName: 'Cloud Function (§71 R7b)'
        });
    } catch (err) {
        console.warn('[onUserRoleAssigned] §71 audit log falló:', err.message);
    }
});

/**
 * §71 — recalculateRoleUserCount
 * Schedule cada 5 min: recorre usuarios/, cuenta cuántos tienen
 * cada roleId, actualiza roles/{id}.userCount si difiere.
 *
 * Esto permite que sec-roles UI muestre el count real sin tener
 * que recalcular client-side cada vez.
 */
exports.recalculateRoleUserCount = onSchedule({
    schedule: 'every 5 minutes',
    timeZone: 'America/Bogota',
    region: 'us-central1'
}, async () => {
    console.log('[recalculateRoleUserCount] §71 iniciado');

    let rolesSnap, usersSnap;
    try {
        [rolesSnap, usersSnap] = await Promise.all([
            db.collection('roles').get(),
            db.collection('usuarios').get()
        ]);
    } catch (err) {
        console.error('[recalculateRoleUserCount] §71 error fetch:', err.message);
        return;
    }

    if (rolesSnap.empty) {
        console.log('[recalculateRoleUserCount] §71 sin roles');
        return;
    }

    // Contar usuarios por roleId
    const counts = {};
    usersSnap.forEach(uDoc => {
        const u = uDoc.data();
        if (u.roleId) {
            counts[u.roleId] = (counts[u.roleId] || 0) + 1;
        }
    });

    // Actualizar roles/{id}.userCount si difiere
    let batch = db.batch();
    let batchCount = 0;
    let updated = 0;

    rolesSnap.forEach(rDoc => {
        const r = rDoc.data();
        const newCount = counts[rDoc.id] || 0;
        const oldCount = typeof r.userCount === 'number' ? r.userCount : 0;
        if (oldCount !== newCount) {
            batch.update(rDoc.ref, {
                userCount: newCount,
                _userCountUpdatedAt: new Date().toISOString()
            });
            batchCount++;
            updated++;
        }
    });

    if (batchCount > 0) {
        try {
            await batch.commit();
            console.log(`[recalculateRoleUserCount] §71 actualizados ${updated} roles`);
        } catch (err) {
            console.error('[recalculateRoleUserCount] §71 batch commit falló:', err.message);
        }
    } else {
        console.log('[recalculateRoleUserCount] §71 sin cambios — counts actuales');
    }
});


// ════════════════════════════════════════════════════════════════════
// §87 Sprint C-S9 — autoResolveIdleChats
// ════════════════════════════════════════════════════════════════════
// Cierra automáticamente los chats con mode='live' (asesor estaba
// atendiendo) que llevan >24h sin actividad. Marca:
//   status='closed', closedReason='idle_timeout', closedByRole='system',
//   closedAt=now, closedBy='system'
// + inserta msg system explicando + audit log entry.
//
// Schedule: cada 30 minutos (consistente con baseline §85.3)
// Region: us-central1 (consistente con resto)
// Idempotente: solo procesa chats con status != 'closed'
// Batch writes con cap 500 (Firestore limit)
// ════════════════════════════════════════════════════════════════════

exports.autoResolveIdleChats = onSchedule({
    schedule: 'every 30 minutes',
    timeZone: 'America/Bogota',
    region: 'us-central1'
}, async () => {
    const startedAt = Date.now();
    console.log('[autoResolveIdleChats] §87 iniciado');

    const IDLE_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 24h
    const cutoffMs = startedAt - IDLE_THRESHOLD_MS;
    const nowIso = new Date(startedAt).toISOString();

    let candidatesSnap;
    try {
        // Filtrar por mode='live' AND status != 'closed' (Firestore
        // permite hasta 1 != en queries; el resto se evalúa client-side).
        candidatesSnap = await db.collection('conciergeChats')
            .where('mode', '==', 'live')
            .limit(500)
            .get();
    } catch (err) {
        console.error('[autoResolveIdleChats] §87 fetch failed:', err.message);
        return;
    }

    if (candidatesSnap.empty) {
        console.log('[autoResolveIdleChats] §87 sin candidatos (cero chats en mode=live)');
        return;
    }

    const idleChats = [];
    candidatesSnap.forEach(doc => {
        const data = doc.data() || {};
        if (data.status === 'closed') return; // ya cerrados, skip
        // Determinar lastActivityMs desde lastMessageAt (ISO string)
        let lastActivityMs = 0;
        if (data.lastMessageAt) {
            const ts = new Date(data.lastMessageAt).getTime();
            if (!isNaN(ts)) lastActivityMs = ts;
        }
        // Fallback al claimedAt o queueEnteredAt si no hay lastMessageAt
        if (!lastActivityMs && data.claimedAt) {
            const ts = new Date(data.claimedAt).getTime();
            if (!isNaN(ts)) lastActivityMs = ts;
        }
        if (!lastActivityMs && data.queueEnteredAt) {
            const ts = new Date(data.queueEnteredAt).getTime();
            if (!isNaN(ts)) lastActivityMs = ts;
        }
        if (!lastActivityMs) return; // sin timestamp confiable, skip
        if (lastActivityMs > cutoffMs) return; // dentro del threshold, skip
        idleChats.push({ ref: doc.ref, sessionId: doc.id, lastActivityMs, data });
    });

    if (idleChats.length === 0) {
        console.log('[autoResolveIdleChats] §87 sin chats idle (>24h sin actividad)');
        return;
    }

    console.log(`[autoResolveIdleChats] §87 encontrados ${idleChats.length} chats idle. Procesando...`);

    let resolved = 0;
    let errors = 0;
    // Cap defensive: 500 ops por batch (Firestore limit). Cada chat
    // genera 2 ops (update parent + insert msg system) → cap a 200 chats.
    const MAX_PER_RUN = 200;
    const toProcess = idleChats.slice(0, MAX_PER_RUN);

    let batch = db.batch();
    let batchOps = 0;

    for (const item of toProcess) {
        try {
            // Op 1: update doc parent del chat
            batch.update(item.ref, {
                status: 'closed',
                closedAt: nowIso,
                closedBy: 'system',
                closedReason: 'idle_timeout',
                closedByRole: 'system',
                lastMessage: '✓ Conversación cerrada automáticamente por inactividad (24h sin actividad)',
                lastMessageAt: nowIso,
                _autoResolvedAt: nowIso,
                _autoResolvedBy: 'autoResolveIdleChats-§87'
            });
            batchOps++;
            // Op 2: insert msg system en subcolección messages/
            const msgRef = item.ref.collection('messages').doc();
            batch.set(msgRef, {
                from: 'system',
                systemType: 'auto-resolved',
                text: '✓ Conversación cerrada automáticamente por inactividad (24h sin actividad). Si necesitás algo más, podés iniciar una nueva conversación.',
                timestamp: nowIso,
                _source: 'autoResolveIdleChats-§87'
            });
            batchOps++;
            resolved++;
            // Commit batch cada 450 ops (margen para no exceder 500)
            if (batchOps >= 450) {
                await batch.commit();
                console.log(`[autoResolveIdleChats] §87 batch parcial commit (${batchOps} ops)`);
                batch = db.batch();
                batchOps = 0;
            }
        } catch (err) {
            errors++;
            console.warn(`[autoResolveIdleChats] §87 chat ${item.sessionId} falló:`, err.message);
        }
    }

    // Commit final si quedaron ops pendientes
    if (batchOps > 0) {
        try {
            await batch.commit();
        } catch (err) {
            console.error('[autoResolveIdleChats] §87 batch final commit falló:', err.message);
            errors++;
        }
    }

    // Audit log entry (best-effort)
    try {
        await db.collection('auditLog').add({
            type: 'chat.auto-resolved',
            count: resolved,
            errors: errors,
            threshold_h: 24,
            timestamp: nowIso,
            actor: 'system',
            actorName: 'Cloud Function (autoResolveIdleChats §87)',
            durationMs: Date.now() - startedAt
        });
    } catch (err) {
        console.warn('[autoResolveIdleChats] §87 audit log skip:', err.message);
    }

    console.log(`[autoResolveIdleChats] §87 completado: ${resolved} chats cerrados, ${errors} errores. Total candidatos en mode=live: ${candidatesSnap.size}.`);
});

// ========== CRM Fase 1 — Capa de ingestión canónica ==========
exports.onSolicitudCreated = require('./src/ingestion/onSolicitudCreated').onSolicitudCreated;
// ========== CRM — Canal AUTO: registro de cuenta → contacto (§163) ==========
exports.onClienteCreated = require('./src/ingestion/onClienteCreated').onClienteCreated;
