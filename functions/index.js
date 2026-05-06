const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentWritten, onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
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
